import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  // Verify token on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/verify-token', { withCredentials: true })
      .then(() => navigate('/'))
      .catch(error => console.error('Error verifying token:', error));
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset validation errors
    setValidEmail(false);
    setValidPassword(false);

    // Basic validation
    if (!email.trim()) {
      setValidEmail(true);
      toast.error("Please enter a valid email!");
      return;
    }
    if (!password.trim()) {
      setValidPassword(true);
      toast.error("Enter a valid password!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', 
        { email, password }, 
        { withCredentials: true }
      );

      toast.success("Login successful!");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password! Try again.");
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 mm:grid-cols-2 font-poppins bg-slate-500">
      {/* Left Column: Image */}
      <div className="hidden mm:flex md:mr-5">
        <img
          className="w-full h-full object-cover"
          src='./images/sign.jpeg'
          alt="Cover"
          loading='lazy'
        />
      </div>

      {/* Right Column: Login Form */}
      <div className="flex flex-col justify-center items-center p-8 md:ml-2">
        <div className="w-full max-w-md">
          <div className='bg-white text-center mm:px-4 px-8 pt-6 pb-8 mb-4'>
            <form className="mt-10" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="relative mb-4">
                <FaUser className="absolute left-3 md:top-5 top-4 text-gray-400" />
                <input
                  className="mt-1 focus:ring-primaryC-500 focus:border-primaryC-500 block sm:text-lg border-gray-300 p-2 shadow appearance-none border rounded-xl w-full py-3 px-3 pl-10 text-gray-700 mb-3 leading-tight"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {validEmail && <p className='text-red-700'>Enter your email!</p>}
              </div>

              {/* Password Input */}
              <div className="relative mb-10">
                <FaLock className="absolute left-3 md:top-5 top-4 text-gray-400" />
                <input
                  className="mt-1 focus:ring-primaryC-500 focus:border-primaryC-500 block sm:text-lg border-gray-300 p-2 shadow appearance-none border rounded-xl w-full py-3 px-3 pl-10 text-gray-700 mb-3 leading-tight"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {validPassword && <p className='text-red-700'>Enter the password!</p>}
              </div>

              {/* Login Button */}
              <div className="text-center mb-4">
                <button
                  className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline md:py-3 md:px-5 md:text-lg shadow-bottom w-full mb-4"
                  type="submit"
                >
                  Login Now
                </button>
                <span>OR</span>
              </div>

              {/* Register Link */}
              <div className='flex flex-col text-center mb-10'>
                <span className='md:text-sm'>
                  Don't have an account? <a href='/register' className='text-cyan-700'>Sign up.</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
