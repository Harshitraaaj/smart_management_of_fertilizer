# ================== CROPS & SOILS ==================

CROPS = [
    "Barley", "Cotton", "Ground Nuts", "Maize", "Millets",
    "Oil seeds", "Paddy", "Pulses", "Sugarcane", "Tobacco", "Wheat"
]

SOILS = ["Loamy", "Sandy", "Clayey", "Black", "Red"]

# ================== CROP NUTRIENT REQUIREMENTS ==================

CROP_REQUIREMENTS = {
    "Barley":      {"N": 60,  "P": 30, "K": 30},
    "Cotton":      {"N": 100, "P": 50, "K": 50},
    "Ground Nuts": {"N": 20,  "P": 40, "K": 40},
    "Maize":       {"N": 135, "P": 65, "K": 45},
    "Millets":     {"N": 60,  "P": 30, "K": 30},
    "Oil seeds":   {"N": 60,  "P": 40, "K": 40},
    "Paddy":       {"N": 100, "P": 50, "K": 40},
    "Pulses":      {"N": 30,  "P": 60, "K": 30},
    "Sugarcane":   {"N": 150, "P": 60, "K": 60},
    "Tobacco":     {"N": 110, "P": 50, "K": 90},
    "Wheat":       {"N": 120, "P": 60, "K": 40},
}

# ================== SOIL NPK VALUES ==================

SOIL_NPK = {
    "Loamy":  {"N": 80, "P": 40, "K": 40},
    "Sandy":  {"N": 50, "P": 30, "K": 30},
    "Clayey": {"N": 90, "P": 50, "K": 60},
    "Black":  {"N": 85, "P": 60, "K": 70},
    "Red":    {"N": 60, "P": 35, "K": 30},
}
