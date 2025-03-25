import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');  // Reintroduced the username state
    const [name, setName] = useState('');  // Added state for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, setError] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    useEffect(() => {
        axios.get('/api/auth/verify-token', { withCredentials: true })
            .catch(err => console.error('Token verification failed:', err));
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            setError('Please accept the terms and conditions.');
            return;
        }

        if (password !== cpassword) {
            setError('Passwords do not match');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, name, email, password });
            console.log(username, name, email, password);

            // Reset form
            setUsername('');
            setName('');
            setEmail('');
            setPassword('');
            setCpassword('');
            setError('');

            // Redirect to login or home page
            navigate('/');
        } catch (err) {
            if (err.response?.data?.msg) {
                setError(err.response.data.msg);
            } else {
                setError('Registration failed. Try again.');
            }
        }
    };

    const validatePassword = (password) => {
        if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
        if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
        if (!/[0-9]/.test(password)) return "Password must have a number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must have a special character";
        if (password.length < 8) return "Password must be at least 8 characters long";
        return null;
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input className="w-full p-2 mb-3 border rounded" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="w-full p-2 mb-3 border rounded" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input className="w-full p-2 mb-3 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="w-full p-2 mb-3 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input className="w-full p-2 mb-3 border rounded" type="password" placeholder="Confirm Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} required />

                    <label className="flex items-center mb-3">
                        <input type="checkbox" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} className="mr-2" />
                        I accept the terms and conditions
                    </label>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
