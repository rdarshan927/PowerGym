import { React, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MembershipManagement from "./components/pages/MembershipManagement";
import GymWebsite from "./components/pages/GymWebsite";
import MembershipForm from "./components/MembershipForm";
import Navbar from "./components/NavBar";
import TopBar from "./components/TopBar";


function App() {

    const scriptsLoaded = useRef(false);
   // useTokenRefresh();
  
/*     useEffect(() => {
      if (scriptsLoaded.current) return;
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          document.body.appendChild(script);
          script.onload = resolve;
          script.onerror = reject;
        });
      };
  
      const loadScriptsInOrder = async () => {
        try {
          await loadScript(`/assets/js/head.js`);
          await loadScript(`/assets/js/app.min.js`);
          scriptsLoaded.current = true;
        } catch (error) {
          console.error("Error loading scripts", error);
        }
      };
  
      loadScriptsInOrder();
    }, []);
   */
    return (
        <Router>
            <Routes>
                <Route path="/membershipManagement" element={ <MembershipManagement /> } />
                <Route path="/home" element={  <GymWebsite /> } />
                <Route path="/membershipForm" element={  <MembershipForm />} />
                <Route path="/nav" element={  <Navbar />} />
                <Route path="/bar" element={  <TopBar />  } />
            </Routes>
        </Router>
    );
}

export default App;
