import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home2 from "./pages/Home2";
import ScheduleForm from "./pages/ScheduleForm";
// import ScheduleDay from "./pages/ScheduleDay";
import ManageSchedules from "./pages/ManageSchedules";

import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home2/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/addschedule' element={<ScheduleForm/>}/>
                {/* <Route path='/scheduleday' element={<ScheduleDay/>}/> */}
                <Route path='/manageschedules' element={<ManageSchedules/>}/>
                
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
