import joblib
import pandas as pd

model = joblib.load("models/house_price_model.pkl")

house = pd.DataFrame({
    "MedInc":[8.5],
    "HouseAge":[20],
    "AveRooms":[6.5],
    "AveBedrms":[1.2],
    "Population":[1200],
    "AveOccup":[3],
    "Latitude":[34.05],
    "Longitude":[-118.25]
})

prediction = model.predict(house)

print("Predicted House Value:", prediction[0])