from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)

CORS(app)
# Load the trained model and encoders
model = joblib.load("model.pkl")
label_encoders = joblib.load("label_encoders.pkl")

# Features used for prediction
feature_columns = ['Sex', 'Age', 'Height', 'Weight', 'Hypertension', 'Diabetes', 'BMI', 'Level', 'Fitness Goal']  # 'Fitness Goal' here

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        print("Received Data:", data)

        if not data:
            return jsonify({"error": "No data received"}), 400

        # Ensure all required fields are present
        required_fields = ["Sex", "Age", "Height", "Weight", "Hypertension", "Diabetes", "BMI", "Level", "FitnessGoal"]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        # Rename the "FitnessGoal" field to "Fitness Goal"
        if "FitnessGoal" in data:
            data["Fitness Goal"] = data.pop("FitnessGoal")
        
        # Convert data to DataFrame
        df = pd.DataFrame([data])

        # Encode categorical variables
        for column in label_encoders:
            if column in df:
                df[column] = label_encoders[column].transform(df[column])

        # Ensure correct column order
        df = df[feature_columns]

        # Make prediction
        prediction = model.predict(df)[0]

        # Decode the prediction (convert back to category)
        fitness_type = label_encoders['Fitness Type'].inverse_transform([prediction])[0]

        return jsonify({"fitness_type": fitness_type})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

