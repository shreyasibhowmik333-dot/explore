import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { verify } from "./features/userSlice";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Booking from "./components/Booking";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

function App() {
  const dispatch = useDispatch();
  const { token, authChecked } = useSelector((state) => state.user);

  useEffect(() => {
    if (token && !authChecked) {
      dispatch(verify()); // 🔑 only call verify once on refresh
    }
  }, [token, authChecked, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/aboutus" element={<AboutUs />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
