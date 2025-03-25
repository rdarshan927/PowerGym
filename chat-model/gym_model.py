import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Step 1: Load Dataset
file_path = "./gymdiet.csv"  # Ensure correct path
df = pd.read_csv(file_path)

# Step 2: Drop unnecessary columns (ID and text-based data like Exercises & Diet)
df = df.drop(columns=['ID', 'Exercises', 'Diet'])

# Step 3: Encode Categorical Variables
label_encoders = {}
categorical_columns = ['Sex', 'Hypertension', 'Diabetes', 'Level', 'Fitness Goal', 'Fitness Type']

for column in categorical_columns:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le  # Store encoders for later use

# Step 4: Define Features (X) and Target (y)
target_column = 'Fitness Type'  # Target for prediction
X = df.drop(columns=[target_column])
y = df[target_column]

# Step 5: Split Data into Train & Test Sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 6: Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 7: Evaluate Model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Step 8: Save Model and Encoders
joblib.dump(model, "model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")

print("Model and encoders saved successfully.")

