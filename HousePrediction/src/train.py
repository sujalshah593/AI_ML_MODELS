import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

df = pd.read_csv("data/california_housing.csv")

X = df.drop("MedHouseVal", axis = 1)

y = df["MedHouseVal"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, predictions)

print("\n===== Model Evaluation =====")
print(f"MAE  : {mae:.3f}")
print(f"MSE  : {mse:.3f}")
print(f"RMSE : {rmse:.3f}")
print(f"R² Score : {r2:.3f}")

print("\nFirst 10 Predictions:")
print(predictions[:10])
for actual, predicted in zip(y_test[:10], predictions[:10]):
    print(f"{actual:<15.3f} {predicted:.3f}")

# print("Training Features (X_train): ", X_train.shape)
# print("Testing Features (X_test): ", X_test.shape)
# print("Training Target (y_train): ", y_train.shape)
# print("Testing Target (y_test): ", y_test.shape)
# print("\nX_train:")
# print(X_train.head())
# print("✅ Model trained successfully!")
# print("\ny_train:")
# print(y_train.head())

joblib.dump(model, "models/house_price_model.pkl")
print("✅ Model saved successfully!")