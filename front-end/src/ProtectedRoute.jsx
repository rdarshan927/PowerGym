import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ adminOnly }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/verify-token', { withCredentials: true })
            .then(response => {
                setIsAuthenticated(true);
                setIsAdmin(response.data.role === 'ADMIN');
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>; // Show a loader

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (adminOnly && !isAdmin) return <Navigate to="/" />;

    return <Outlet />;
};

export default ProtectedRoute;
