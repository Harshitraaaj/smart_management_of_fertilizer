import pandas as pd
import random

crops = ["Wheat", "Paddy", "Maize", "Sugarcane", "Cotton", "Pulses"]
soils = ["Loamy", "Clayey", "Black", "Red", "Sandy"]

fertilizer_profiles = {
    "Urea":        lambda: (random.randint(10, 25), random.randint(20, 40), random.randint(20, 40)),
    "DAP":         lambda: (random.randint(30, 60), random.randint(10, 20), random.randint(30, 50)),
    "MOP":         lambda: (random.randint(30, 60), random.randint(30, 50), random.randint(10, 20)),
    "20-20":       lambda: (random.randint(30, 60), random.randint(30, 60), random.randint(30, 60)),
    "14-35-14":    lambda: (random.randint(20, 40), random.randint(55, 80), random.randint(20, 40)),
    "10-26-26":    lambda: (random.randint(20, 40), random.randint(30, 50), random.randint(55, 80)),
    "28-28":       lambda: (random.randint(25, 45), random.randint(25, 45), random.randint(25, 45)),
}

ROWS_PER_FERTILIZER = 300  # 7 fertilizers × 300 = 2100 rows
data = []

for fertilizer, npk_generator in fertilizer_profiles.items():
    for _ in range(ROWS_PER_FERTILIZER):
        crop = random.choice(crops)
        soil = random.choice(soils)

        temperature = random.randint(18, 40)
        humidity = random.randint(30, 85)
        moisture = random.randint(20, 85)

        N, P, K = npk_generator()

        data.append([
            temperature, humidity, moisture,
            soil, crop,
            N, P, K,
            fertilizer
        ])

columns = [
    "Temperature", "Humidity", "Moisture",
    "Soil_Type", "Crop_Type",
    "Nitrogen", "Phosphorus", "Potassium",
    "Fertilizer"
]

df = pd.DataFrame(data, columns=columns)

# Shuffle rows
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

df.to_csv("fertilizer_dataset_balanced.csv", index=False)

print("✅ Balanced dataset created!")
print(df["Fertilizer"].value_counts())
