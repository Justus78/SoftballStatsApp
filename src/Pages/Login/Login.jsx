// src/components/Login.js
import React, { useContext, useState } from "react";
import { postToApi } from "../../api"; // Import the API utility
import "./Login.css"
import { toast } from "react-toastify";
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { DataContext } from "../../Context/DataContext";

const Login = ({ onLogin, onLogout }) => {
  const [userName, setUserName] = useState(""); // State to track user input
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to track any error message
  const [signInState, setSignInState] = useState("Login"); // set the sign in state
  const { isAuthenticated } = useContext(DataContext);

  // Handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    // Prepare the login data
    const loginData = {
      UserName: userName,
      Password: password,
    };

    try {
      // Send login request to the API
      const { error, data } = await postToApi("login", loginData);

      if (error) {
        setError("Incorrect username or password");
        toast.error("Incorrect username or password");
        return;
      }

      // On success, save the JWT token and user details
      localStorage.setItem("token", data.token); // Save token in localStorage
      
      localStorage.setItem("user", JSON.stringify(data)); // Save user details

      onLogin(data); // Pass the user data to the parent component
      toast.success('Login successful.');
    } catch (err) {
      setError(err.message); // Display any error message
      toast.error(err.message);
    }
  };

  return (
  <>    
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated}/>
    <div className="login">
      {/*<img src="" className="login-logo" alt="" />*/}
      <div className="login-form">
       
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="userName" >Username</label>
                  <input
                      type="text"
                      id="userName"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required />
              </div>
              <div>
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />
              </div>
              <div className="button-container">
                <button type="submit">Login</button>
                
              </div>              
          </form>
          {error && <div className="error-message">{error}</div>}      </div>
    </div>
    <Footer />
  </>
  );
};

export default Login;
