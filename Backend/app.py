from flask import Flask, request, jsonify
import pickle
<<<<<<< HEAD
import numpy as np
import random

app = Flask(_name_)
=======
import re
import numpy as np
import random
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
>>>>>>> upstream/main

# ---------- Load Models ----------
model = pickle.load(open("xgb_pipeline.pkl", "rb"))
fertname_dict = pickle.load(open("fertname_dict.pkl", "rb"))
croptype_dict = pickle.load(open("croptype_dict.pkl", "rb"))
soiltype_dict = pickle.load(open("soiltype_dict.pkl", "rb"))

# Reverse mapping for encoding
crop_to_int = {v: k for k, v in croptype_dict.items()}
soil_to_int = {v: k for k, v in soiltype_dict.items()}

<<<<<<< HEAD

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        # Handle environmental data or sensor failure
        temperature = data.get("Temperature", 28)
        humidity = data.get("Humidity", 65)
        moisture = data.get("Moisture", data.get("SoilMoisture", 18))

        # Crop type and soil type from frontend (required)
        crop_type = int(data['cropType'])
        soil_type = int(data['soilType'])

        # If NPK sensor fails, assign dummy values
=======
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


@app.route("/groq-chat", methods=["POST"])
def groq_chat():
    user_input = request.json.get("message")

    llm = ChatOpenAI(
        base_url="https://api.groq.com/openai/v1",
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY"),
    )

    system_prompt = """
You are an assistant that always responds in a clear, structured format for informative questions. Use the following sections only if they make sense:

**Answer:**
- Main points in numbered format.

**Explanation:**
- Explain the answer in numbered points if applicable. Skip if the question is trivial or conversational.

**Example:**
- Give an example in numbered points if relevant. Otherwise, write "N/A".

Include line breaks between sections. Keep answers very concise, easy to read, and in points with space after each numbered point. For greetings or casual talk, just respond naturally without forcing Explanation or Example.
"""

    response = llm.invoke(
        [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input},
        ]
    )

    llm_text = response.content.strip()

    # Plain text for greetings/casual messages
    if "**Answer:**" not in llm_text:
        return jsonify({"reply": llm_text})

    # Extract structured sections
    answer_match = re.search(
        r"\*\*Answer:\*\*\s*(.*?)\s*(\*\*Explanation:\*\*|$)", llm_text, re.DOTALL
    )
    explanation_match = re.search(
        r"\*\*Explanation:\*\*\s*(.*?)\s*(\*\*Example:\*\*|$)", llm_text, re.DOTALL
    )
    example_match = re.search(r"\*\*Example:\*\*\s*(.*)", llm_text, re.DOTALL)

    response_json = {
        "answer": format_points(answer_match.group(1)) if answer_match else ["N/A"],
        "explanation": (
            format_points(explanation_match.group(1)) if explanation_match else ["N/A"]
        ),
        "example": format_points(example_match.group(1)) if example_match else ["N/A"],
    }

    return jsonify(response_json)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        global latest_selection, latest_sensor_data

        # Read incoming data
        data = request.get_json(force=True)
        latest_selection = data
        print("Received /predict data:", latest_selection, flush=True)

        # Environmental and sensor data
        temperature = data.get("Temperature", latest_sensor_data["Temperature"])
        humidity = data.get("Humidity", latest_sensor_data["Humidity"])
        moisture = data.get(
            "Moisture", data.get("SoilMoisture", latest_sensor_data["Moisture"])
        )

        # Crop and soil type
        crop_type = data.get("cropType", 0)
        soil_type = data.get("soilType", 0)

        soil_val = (
            soil_type if isinstance(soil_type, int) else soil_to_int.get(soil_type, 0)
        )
        crop_val = (
            crop_type if isinstance(crop_type, int) else crop_to_int.get(crop_type, 0)
        )

        # NPK values (random if missing)
>>>>>>> upstream/main
        nitrogen = data.get("Nitrogen", random.randint(30, 60))
        phosphorus = data.get("Phosphorus", random.randint(15, 40))
        potassium = data.get("Potassium", random.randint(10, 35))

<<<<<<< HEAD
        # Encode categorical inputs
        soil_val = soil_type if isinstance(soil_type, int) else soil_to_int.get(soil_type, 0)
        crop_val = crop_type if isinstance(crop_type, int) else crop_to_int.get(crop_type, 0)

        # Prepare features in correct order for the model
        features = np.array([[temperature, humidity, moisture,
                              soil_val, crop_val, nitrogen, phosphorus, potassium]])

        # Predict fertilizer
        pred_label = int(model.predict(features)[0])
        fertilizer = fertname_dict[pred_label]

        # Return JSON with all details for frontend graph/UI
        return jsonify({
            "Temperature": temperature,
            "Humidity": humidity,
            "Moisture": moisture,
            "Soil Type": soil_type,
            "Crop Type": crop_type,
            "Nitrogen": nitrogen,
            "Phosphorus": phosphorus,
            "Potassium": potassium,
            "predicted_fertilizer": fertilizer
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def home():
    return jsonify({
        "message": "Smart Fertilizer Recommendation API (Test Mode)",
        "note": "If NPK sensor fails, random dummy values are used for Nitrogen, Phosphorus, Potassium"
    })


if _name_ == '_main_':
    app.run(debug=True)
=======
        # Update latest sensor data
        latest_sensor_data.update(
            {
                "Temperature": temperature,
                "Humidity": humidity,
                "Moisture": moisture,
                "Nitrogen": nitrogen,
                "Phosphorus": phosphorus,
                "Potassium": potassium,
            }
        )

        # Prepare features for model
        features = np.array(
            [
                [
                    temperature,
                    humidity,
                    moisture,
                    soil_val,
                    crop_val,
                    nitrogen,
                    phosphorus,
                    potassium,
                ]
            ]
        )

        pred_label = int(model.predict(features)[0])
        fertilizer = fertname_dict.get(pred_label, "Unknown")
        print("Predicted Fertilizer:", fertilizer)

        return jsonify(
            {
                "Temperature": temperature,
                "Humidity": humidity,
                "Moisture": moisture,
                "Soil Type": soil_type,
                "Crop Type": crop_type,
                "Nitrogen": nitrogen,
                "Phosphorus": phosphorus,
                "Potassium": potassium,
                "predicted_fertilizer": fertilizer,
            }
        )

    except Exception as e:
        print("Error in /predict:", e)
        return jsonify({"error": str(e)}), 500


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
>>>>>>> upstream/main
