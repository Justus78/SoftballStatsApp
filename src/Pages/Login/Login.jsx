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
  const { isAuthenticated  } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  console.log(isLogin);

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
      {/* <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} /> */}

      <div className="login-container">      

        <div className="register">    
          <div className="register-form">
    
            <h2 className="register-title">{isLogin ? 'Login' : "Register"}</h2>
            <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
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

              {isLogin ? "" :
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
              }

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
                <button className="login-button" type="submit">{isLogin ? "Login" : "Register"}</button>
              </div>
              
    
            </form>
            {error && <div className="error-message">{error}</div>}

            {isLogin ? <p>need an account? click <button className="change-button" onClick={() => setIsLogin(!isLogin)}>Here</button></p> 
            : <p>Already have an account? click <button className="change-button" onClick={() => setIsLogin(!isLogin)}>Here</button></p>}
          </div>
         
          </div>
        </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
