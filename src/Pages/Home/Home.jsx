import React, { useContext, useEffect, useState } from 'react';
import "./Home.css"
import { Link } from 'react-router-dom';
import kenziePic from '../../assets/Kenzie.jpg'
import teamPic from '../../assets/LadyGovs.jpg'
import contactPic from '../../assets/contact.jpg'
import portfolioPic from '../../assets/portfolio.jpg'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { DataContext } from '../../Context/DataContext';

export const Home = ( {onLogout} ) => {
  const { isAuthenticated } = useContext(DataContext);
  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated}/>
      <div className='home-container'>
        
        <div className='grid-container'>

        <div className="card">
          <h3>My Players</h3>
          <div className="image-box">
            <img src={kenziePic}></img>
          </div>
          <p>Click below to see your players.</p>
          <Link to='/players'><button>Players</button></Link>
        </div>
        <div className="card">
          <h3>My Teams</h3>
          <div className="image-box">
            <img src={teamPic}></img>
          </div>
          <p>Click below to see your teams.</p>
          <Link to='/teams'><button>Teams</button></Link>
        </div>
        <div className="card">
          <h3>My Portfolio</h3>
          <div className="image-box">
            <img src={portfolioPic}></img>
          </div>
          <p>Click below to see my portfolio.</p>
          <Link to='https://justus78.github.io/react-portfolio/' target="_blank" rel="noopener noreferrer">
            <button>About</button>
          </Link>

        </div>
        <div className="card">
          <h3>Contact</h3>
          <div className="image-box">
            <img src={contactPic}></img>
          </div>
          <p>Click here to get in contact with me.</p>
          <button>Contact</button>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
