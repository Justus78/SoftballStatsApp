import React, { useContext, useState } from "react";
import { postToApi } from "../../api";
import "./Login.css";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { DataContext } from "../../Context/DataContext";
import Spinner from "../../Components/Spinner/Spinner";
import { Link } from "react-router-dom";

const Login = ({ onLogin, onRegister, onLogout }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loginData = { 
      UserName: userName, 
      Password: password 
    };

    try {
      const { error, data } = await postToApi("login", loginData);

      if (error) {
        setLoading(false);
        setError("Incorrect username or password");
        toast.error("Incorrect username or password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      onLogin(data);
      toast.success("Login successful.");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Handle the register form submission
    const handleRegisterSubmit = async (e) => {
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

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
      <div className="login-container">
        <div className="login">
          <div
            className={`login-box ${isLoginHovered ? "expanded" : ""}`}
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
          >
            {!isLoginHovered ? (
              <h2>Login</h2>
            ) : (
              <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="text"
                    id="userName"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="button-container">
                    <button type="submit">Login</button>
                  </div>
                  
                </form>
                {error && <div className="error-message">{error}</div>}
              </div>
            )}
          </div>
        </div>

        {/* Register Button */}
        <div className="register">
            <div
              className={`register-box ${isRegisterHovered ? "expanded" : ""}`}
              onMouseEnter={() => setIsRegisterHovered(true)}
              onMouseLeave={() => setIsRegisterHovered(false)}
            >
              {!isRegisterHovered ? (
                <h2>Register</h2>
              ) : (
          <div className="register-form">
    
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
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
              
    
            </form>
            {error && <div className="error-message">{error}</div>}
          </div>
          )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
