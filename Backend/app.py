from flask import Flask, request, jsonify ,session
import pandas as pd
import pickle
import re
import numpy as np
import random
from langchain_perplexity import ChatPerplexity
from dotenv import load_dotenv

import os
from flask_cors import CORS
from Config import (
    CROPS, SOILS,
    CROP_REQUIREMENTS, SOIL_NPK
)

load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------- Load Models ----------
model_bundle = pickle.load(open("fertilizer_xgb_model.pkl", "rb"))

model = model_bundle["model"]
scaler = model_bundle["scaler"]
feature_columns = model_bundle["feature_columns"]
le_target = model_bundle["le_target"]


def recommended_fertilizer(crop, soil):
    crop_req = CROP_REQUIREMENTS[crop]
    soil_npk = SOIL_NPK[soil]

    deficiency = {
        n: crop_req[n] - soil_npk[n]
        for n in ["N", "P", "K"]
        if crop_req[n] > soil_npk[n]
    }

    if not deficiency:
        return "Recommended Fertilizer: No fertilizer required"

    if "N" in deficiency:
        return "Recommended Fertilizer: Urea (Nitrogen deficiency)"
    if "P" in deficiency:
        return "Recommended Fertilizer: DAP (Phosphorus deficiency)"
    if "K" in deficiency:
        return "Recommended Fertilizer: MOP (Potassium deficiency)"

    return "Recommended Fertilizer: Balanced NPK"




# Store the latest crop & soil selected
latest_selection = {}
# Store latest sensor readings for /live_data
latest_sensor_data = {
    "Temperature": 28,
    "Humidity": 65,
    "Moisture": 18,
    "Nitrogen": 40,
    "Phosphorus": 25,
    "Potassium": 15,
}


def format_points(text):
    """
    Splits numbered points and ensures each point is on a separate line.
    Returns a list of points for frontend <ul> rendering.
    """
    if not text:
        return ["N/A"]

    # Match numbered points like "1. something", "2. something"
    points = re.findall(r"\d+\.\s*[^0-9]+", text)
    formatted = [pt.strip() for pt in points if pt.strip()]
    return formatted if formatted else ["N/A"]

app.secret_key = "your_secret_key"


@app.route("/groq-chat", methods=["POST"])
def groq_chat():
    user_input = request.json.get("message")

    # Initialize conversation history in session
    if "history" not in session:
        session["history"] = []

    # Append the new user message
    session["history"].append({"role": "user", "content": user_input})

    llm = ChatPerplexity()

    system_prompt = """You are a helpful assistant. Provide clear, concise answers. 
For informative questions, structure your response naturally with explanations and examples when relevant and make sure that response is in this format

Do NOT include references, citations, or numbers in brackets.

Do NOT write long paragraphs.

Do NOT use tables unless explicitly asked.

Write in simple, clear language.

Structure the answer using headings and bullet points.

Explain concepts step by step.

Keep it suitable for students and general understanding.

when ask hi,hello,how are you then do not give explanation give generic response like an assistant"""

    # Pass last 10 messages for context
    last_messages = session["history"][-10:]
    llm_input = [{"role": "system", "content": system_prompt}]
    for msg in last_messages:
        llm_input.append({"role": msg["role"], "content": msg["content"]})

    response = llm.invoke(llm_input)
    llm_text = response.content.strip()

    # Append bot response to history
    session["history"].append({"role": "assistant", "content": llm_text})

    return jsonify({"reply": llm_text})

@app.route("/sensor_data", methods=["POST"])
def sensor_data():
    global latest_sensor_data
    latest_sensor_data = request.json
    return jsonify({"status": "sensor data stored"})



@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    crop = data.get("cropType")
    soil = data.get("soilType")

    if crop not in CROPS or soil not in SOILS:
        return jsonify({"error": "Invalid crop or soil type"}), 400

    return jsonify({
        "crop": crop,
        "soil": soil,
        "recommended_fertilizer": recommended_fertilizer(crop, soil)
    })



@app.route("/live_data", methods=["GET"])
def live_data():
    # Return the latest sensor readings
    return jsonify(latest_sensor_data)


@app.route("/")
def home():
    return jsonify(
        {
            "message": "Smart Fertilizer Recommendation API (Test Mode)",
            "note": "If NPK sensor fails, random dummy values are used for Nitrogen, Phosphorus, Potassium",
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
