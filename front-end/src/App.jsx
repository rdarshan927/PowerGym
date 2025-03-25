import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";

function App() {
    return (
        // <Router>
        //     <Routes>
        //     </Routes>
        // </Router>
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <ChatBot />
        </div>
    );
}

export default App;
