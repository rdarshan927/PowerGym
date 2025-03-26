import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ adminOnly }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Verify the token with the backend using cookies
        axios.get('http://localhost:5000/api/auth/verify-token', { withCredentials: true })
            .then(response => {
                setIsAuthenticated(true);
                setIsAdmin(response.data.role === 'ADMIN');
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>; // Show a loader while checking authentication

    if (!isAuthenticated) return <Navigate to="/login" />; // Redirect to login if not authenticated

    if (adminOnly && !isAdmin) return <Navigate to="/" />; // Redirect to home if user is not an admin

    return <Outlet />; // Render the protected route if authenticated
};

export default ProtectedRoute;
