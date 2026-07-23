import streamlit as st
import joblib
import pandas as pd

# Load model
model = joblib.load("models/house_price_model.pkl")

# Page settings
st.set_page_config(
    page_title="House Price Prediction",
    page_icon="🏠",
    layout="centered"
)

st.title("🏠 House Price Prediction")
st.write("Enter the details below to predict the house price.")

# Inputs
med_inc = st.number_input("Median Income", value=5.0)
house_age = st.number_input("House Age", value=20.0)
rooms = st.number_input("Average Rooms", value=6.0)
bedrooms = st.number_input("Average Bedrooms", value=1.0)
population = st.number_input("Population", value=1000.0)
occupancy = st.number_input("Average Occupancy", value=3.0)
latitude = st.number_input("Latitude", value=34.05)
longitude = st.number_input("Longitude", value=-118.25)

# Prediction
if st.button("Predict Price"):

    house = pd.DataFrame({
        "MedInc": [med_inc],
        "HouseAge": [house_age],
        "AveRooms": [rooms],
        "AveBedrms": [bedrooms],
        "Population": [population],
        "AveOccup": [occupancy],
        "Latitude": [latitude],
        "Longitude": [longitude]
    })

    prediction = model.predict(house)

    st.success(f"🏠 Predicted House Value: ${prediction[0] * 100000:,.2f}")