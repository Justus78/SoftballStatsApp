// src/components/Register.js
import React, { useContext, useState } from "react";
import { postToApi } from "../../api"; // Import the API utility
import { toast } from "react-toastify";
import './Register.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { DataContext } from "../../Context/DataContext";
import { data } from "react-router-dom";

const Register = ({ onRegister, onLogout }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(DataContext);

  // Handle the register form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
  
    const registerData = {
      UserName: userName,
      Email: email,
      Password: password,
    };
  
    const { error, data } = await postToApi("register", registerData);
  
    if (error) {
      setError(error); // Show error on screen
      toast.error(error); // Show error toast
      return;
    }
  
    // On success, save token and user details
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
  
    onRegister(data);
    toast.success("User registered successfully.");
  };

  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated}/>
    <div className="register">
      <div className="register-form">

        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Register;
