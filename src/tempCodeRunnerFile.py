import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

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