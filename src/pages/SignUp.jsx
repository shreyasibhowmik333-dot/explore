import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/userSlice";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        role: "",
        userName: "",
        phoneNo: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(register(formData));
        if (res.meta.requestStatus === "fulfilled") {
            navigate("/login");
        }
    };

    return (
        <div className="signup-bg min-h-screen">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 sm:p-8 relative z-10">

                    <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">
                        Create an Account
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* ROLE */}
                        <div className="mb-4">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>

                        {/* USERNAME */}
                        <div className="mb-4">
                            <label className="block text-cyan-700 font-medium">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>

                        {/* PHONE */}
                        <div className="mb-4">
                            <label className="block text-cyan-700 font-medium">
                                Phone Number
                            </label>
                            <input
                                type="number"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="mb-4">
                            <label className="block text-cyan-700 font-medium">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-4">
                            <label className="block text-cyan-700 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-700 text-white text-xl py-2 rounded-md font-semibold"
                        >
                            {loading ? "Registering..." : "SIGN UP"}
                        </button>
                    </form>

                    {error && (
                        <p className="text-red-600 text-center mt-3">{error}</p>
                    )}

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-cyan-700 font-medium">
                            Login
                        </Link>
                    </p>
                    <p className="text-center">
                        <Link to="/" className="text-cyan-700 font-medium">
                            Back to Home Page
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
