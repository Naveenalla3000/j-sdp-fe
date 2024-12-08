'use client'
import axios from "axios";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Call useNavigate at the top level

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://sb-sdp.onrender.com/api/auth/register`, {
                username: email,
                password,
            });

            console.log(response.data);
            const token = response.data.token;
            const user = response.data.user;
            if (!token) {
                toast.error("Invalid credentials");
                return;
            }
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Logged in successfully");
            navigate("/dashboard"); // Use navigate here
        } catch (err) {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Get Start</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                        Click Here
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <a href="#" className="text-blue-500 hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
