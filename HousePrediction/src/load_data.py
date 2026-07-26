import pandas as pd

# Load the dataset
df = pd.read_csv("../data/california_housing.csv")

print("Dataset loaded successfully!")
print(df.head())