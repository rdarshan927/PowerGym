import { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaWindowMinimize, FaWindowRestore } from "react-icons/fa";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hi! Let's get started. What's your gender?", sender: "bot" }
  ]);
  
  const [formData, setFormData] = useState({
    Sex: "",
    Age: "",
    Height: "",
    Weight: "",
    Hypertension: "No",
    Diabetes: "No",
    BMI: "",
    Level: "",
    FitnessGoal: "",
    answer: "" // To keep track of the current input value
  });
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const questions = [
    { field: "Sex", question: "What is your gender? (Male/Female)" },
    { field: "Age", question: "How old are you?" },
    { field: "Height", question: "What is your height in meters?" },
    { field: "Weight", question: "What is your weight in kg?" },
    { field: "Level", question: "What is your fitness level? (Beginner/Intermediate/Advanced)" },
    { field: "FitnessGoal", question: "What is your fitness goal? (Weight Loss/Muscle Gain)" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswer = (answer) => {
    if (!answer) return; // Prevent empty answers

    // Store the answer in the corresponding form field
    const newFormData = { ...formData, [questions[currentQuestion].field]: answer };
    setFormData(newFormData);

    setMessages((prev) => [
      ...prev,
      { text: answer, sender: "user" }, // Add the user's answer to the chat
      { text: questions[currentQuestion + 1]?.question || "All questions are answered. Submitting...", sender: "bot" } // Show next question or submit message
    ]);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion); // Move to the next question
    } else {
      handleSubmit(); // Auto submit after answering all questions
    }

    // Reset the input field after submission
    setFormData({ ...formData, answer: "" });
  };

  const handleSubmit = async () => {
    // Calculate BMI based on user inputs
    const bmi = parseFloat((formData.Weight / (formData.Height ** 2)).toFixed(2));

    // Prepare the request data
    const requestData = { ...formData, BMI: bmi };

    // Send the request to the backend and get a response
    try {
      const response = await axios.post("http://127.0.0.1:5001/predict", requestData);
      const botReply = response.data.fitness_type;

      setMessages((prev) => [
        ...prev,
        { text: `Based on your data, I recommend: ${botReply}`, sender: "bot" }
      ]);

      // Start over by asking the first question again
      setMessages((prev) => [
        ...prev,
        { text: "Let's start over. What's your gender?", sender: "bot" }
      ]);

      // Reset the form data to start over
      setFormData({
        Sex: "",
        Age: "",
        Height: "",
        Weight: "",
        Hypertension: "No",
        Diabetes: "No",
        BMI: "",
        Level: "",
        FitnessGoal: "",
        answer: ""
      });
      setCurrentQuestion(0);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...messages, { text: "Something went wrong! Try again.", sender: "bot" }]);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleChatVisibility = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-gray-900 text-white rounded-lg shadow-lg z-50">
      <div
        className={`absolute top-0 left-0 w-full p-2 bg-blue-600 rounded-t-lg cursor-pointer flex justify-between items-center ${isMinimized ? "hidden" : ""}`}
      >
        <h2 className="text-lg font-bold">🏋️ GymBot</h2>
        <div className="flex space-x-2">
          <button onClick={toggleMinimize} className="text-white">
            <FaWindowMinimize />
          </button>
          <button onClick={toggleChatVisibility} className="text-white">
            {showChat ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {showChat && (
        <div className={`p-4 space-y-3 ${isMinimized ? "hidden" : ""}`}>
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-lg ${msg.sender === "bot" ? "bg-blue-600" : "bg-gray-700"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <input 
              type="text" 
              name="answer" 
              value={formData.answer} // Control the value of the input field
              placeholder={questions[currentQuestion]?.question || "Answer the question"} 
              onChange={(e) => handleChange(e)} 
              onKeyDown={(e) => e.key === 'Enter' && handleAnswer(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
            />
            <button 
              onClick={() => handleAnswer(formData.answer)} 
              className="w-full bg-blue-500 p-2 mt-2 flex justify-center items-center rounded">
              <FaPaperPlane className="ml-2"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
