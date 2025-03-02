// src/components/Register.js
import React, { useContext, useState } from "react";
import { postToApi } from "../../api"; // Import the API utility
import { toast } from "react-toastify";
import './Register.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { DataContext } from "../../Context/DataContext";
import { Link } from "react-router-dom"

const Register = ({ onRegister, onLogout }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(DataContext);
  const [isHovered, setIsHovered] = useState(false);
  

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

    {/* Register Button */}
    <div className="register">
        <div
          className={`register-box ${isHovered ? "expanded" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered ? (
            <h2>Register</h2>
          ) : (
      <div className="register-form">

        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName"></label>
            <input
              type="text"
              id="userName"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit">Register</button>
          </div>
          <div className="login_">
            <p>Already have an account? <Link to='/login'><span>Login</span></Link></p>
          </div>

        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
      )}
      </div>
    </div>

    
    <Footer />
    </>
  );
};

export default Register;
