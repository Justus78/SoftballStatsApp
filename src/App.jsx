import { useState, useEffect, useContext } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import  Login  from './Pages/Login/Login';
import  Register  from './Pages/Register/Register';
import PlayerHome from './Pages/Player/PlayerHome/PlayerHome';
import TeamHome from './Pages/Team/TeamHome/TeamHome';
import AddPlayer from './Pages/Player/AddPlayer/AddPlayer';
import PlayerUpdate from './Pages/Player/PlayerUpdate/PlayerUpdate';
import TeamAdd from './Pages/Team/TeamAdd/TeamAdd';
import TeamUpdate from './Pages/Team/TeamUpdate/TeamUpdate';
import { StatsHome } from './Pages/Stats/StatsHome/StatsHome';
import { DataContext, DataProvider } from './Context/DataContext';
import AddStats from './Pages/Stats/AddStats/AddStats';
import UpdateStats  from './Pages/Stats/UpdateStats/UpdateStats';
import Navbar from './Components/Navbar/Navbar';
import SpinnerTest from './Pages/SpinnerTest/SpinnerTest';
import Footer from './Components/Footer/Footer';
import './App.css'

const App = () => {
const { isAuthenticated, setIsAuthenticated } = useContext(DataContext);
  // Check if user is logged in (based on the presence of a token)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Define the onLogin function to handle successful login
  const onLogin = (data) => {
    localStorage.setItem('token', data.token); // Save token to localStorage
    setIsAuthenticated(true); // Update authentication state
  };

  const onRegister = (data) => {
    localStorage.setItem('token', data.token); // Save token to localStorage
    localStorage.setItem('user', data.user)
    setIsAuthenticated(true); // Update authentication state
  }

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (

        <div className="main-container">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home onLogout={onLogout} /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogout={onLogout} onLogin={onLogin} onRegister={onRegister}/>} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register onLogout={onLogout} onRegister={onRegister} />} />
            <Route path="/players" element={isAuthenticated ? <PlayerHome onLogout={onLogout} /> : <Navigate to="/"/>} />
            <Route path="/AddPlayer" element={isAuthenticated ? <AddPlayer onLogout={onLogout} />: <Navigate to="/"/>} />      
            <Route path='/updatePlayer/:id' element={isAuthenticated ? <PlayerUpdate onLogout={onLogout} /> : <Navigate to="/"/>} />
            <Route path='/teams' element={isAuthenticated ? <TeamHome onLogout={onLogout} /> : <Navigate to="/"/>} />
            <Route path='/addTeam' element={isAuthenticated ? <TeamAdd onLogout={onLogout} /> : <Navigate to="/"/>} />
            <Route path='/updateTeam/:id' element={isAuthenticated ? <TeamUpdate onLogout={onLogout} /> : <Navigate to="/"/>} />
            <Route path='/playerStats/:id' element={isAuthenticated ? <StatsHome onLogout={onLogout} /> : <Navigate to="/"/>} />
            <Route path='/addStats/:id' element={isAuthenticated ? <AddStats onLogout={onLogout} /> : <Navigate to="/"/>} />
            <Route path='/updateStats/:statId/:playerId' element={isAuthenticated ? <UpdateStats onLogout={onLogout} /> : <Navigate to="/" />} />
            <Route path='/spinnerTest' element={<SpinnerTest />} />
          </Routes>
        </div>  
        
  );
  
};

export default App;
