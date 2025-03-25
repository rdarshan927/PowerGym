import { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hi! Tell me about yourself, and I'll recommend a fitness type.", sender: "bot" }
  ]);
  
  const [formData, setFormData] = useState({
    Sex: "",
    Age: "",
    Height: "",
    Weight: "",
    Hypertension: "",
    Diabetes: "",
    BMI: "",
    Level: "",
    FitnessGoal: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.Sex || !formData.Age || !formData.Height || !formData.Weight || !formData.Level || !formData.FitnessGoal) {
      alert("Please fill in all fields.");
      return;
    }

    // Convert to proper JSON structure
    const requestData = {
      ...formData,
      Age: Number(formData.Age),
      Height: Number(formData.Height),
      Weight: Number(formData.Weight),
      BMI: parseFloat((formData.Weight / (formData.Height ** 2)).toFixed(2)), // BMI Calculation
      Hypertension: formData.Hypertension || "No",
      Diabetes: formData.Diabetes || "No"
    };

    // Add user message
    setMessages([...messages, { text: "Finding the best fitness type for you...", sender: "bot" }]);

    try {
      console.log(requestData);
      const response = await axios.post("http://127.0.0.1:5001/predict", requestData);
      console.log("Response:", response.data);  // Debugging

      // Get the response data (fitness type, exercises, and diet)
      const { fitness_type, exercises, diet } = response.data;

      setMessages((prev) => [
        ...prev,
        { text: `Based on your data, I recommend:`, sender: "bot" },
        { text: `Fitness Type: ${fitness_type}`, sender: "bot" },
        { text: `Exercises: ${exercises}`, sender: "bot" },
        { text: `Diet: ${diet}`, sender: "bot" }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...messages, { text: "Something went wrong! Try again.", sender: "bot" }]);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center">🏋️ GymBot</h2>
      
      <div className="mt-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg ${msg.sender === "bot" ? "bg-blue-600" : "bg-gray-700"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <input type="text" name="Sex" placeholder="Male / Female" onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <input type="number" name="Age" placeholder="Age" onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <input type="number" name="Height" placeholder="Height (meters)" onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <input type="number" name="Weight" placeholder="Weight (kg)" onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <input type="text" name="Level" placeholder="Beginner / Intermediate / Advanced" onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <input type="text" name="FitnessGoal" placeholder="Weight Loss / Muscle Gain" onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <button onClick={handleSubmit} className="w-full bg-blue-500 p-2 mt-2 flex justify-center items-center rounded">
          Get Recommendation <FaPaperPlane className="ml-2"/>
        </button>
      </div>
    </div>
  );
}
