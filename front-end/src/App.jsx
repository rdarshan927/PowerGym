import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home2 from "./pages/Home2";

import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home2/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                {/* <Route path='/gymbot' element={<ChatBot/>}/> */}

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/gymbot" element={<ChatBot />} />
                </Route>

                {/* Admin Only Route */}
                {/* <Route element={<ProtectedRoute adminOnly={true} />}>
                    <Route path="/admin" element={<AdminPanel />} />
                </Route> */}
            </Routes>
        </Router>
    );
}

export default App;
