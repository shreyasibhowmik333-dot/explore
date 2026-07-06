import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <div className="login-bg min-h-screen">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white p-6 shadow-lg rounded-xl w-full max-w-sm relative z-10">

                    <form onSubmit={handleSubmit}>
                        <h3 className="text-2xl text-yellow-700 font-bold text-center mb-4">
                            Welcome to Xplore
                        </h3>

                        {/* EMAIL */}
                        <div>
                            <label className="text-lg text-cyan-800 font-medium mb-2 block">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded outline-blue-800"
                                placeholder="Enter email"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="mt-4">
                            <label className="text-lg text-cyan-800 font-medium mb-2 block">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded outline-blue-800"
                                placeholder="Enter password"
                            />
                        </div>

                        {/* ERROR */}
                        {error && (
                            <p className="text-red-600 text-sm text-center mt-3">
                                {error}
                            </p>
                        )}

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-5 bg-yellow-700 text-xl text-white font-medium uppercase p-2 rounded-lg w-full"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* LINKS */}
                        <div className="text-center mt-4 text-sm">
                            <p>
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-cyan-800 font-medium hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                            <p>
                                <Link
                                    to="/"
                                    className="text-cyan-800 font-medium hover:underline"
                                >
                                    Back to home page
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;


