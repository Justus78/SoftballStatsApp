import React, { useContext, useEffect, useState } from 'react'
import { deleteTeam, fetchTeams } from '../../../Services/TeamService';
import { Link } from 'react-router-dom';
import  altProfilePic  from '../../../../src/assets/altProfilePic.jpg'
import './TeamHome.css'
import Team from '../../../Components/Team/Team';
import { toast } from 'react-toastify';
import { DataContext } from '../../../Context/DataContext';
import Spinner from '../../../Components/Spinner/Spinner';
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const TeamHome = ( {onLogout} ) => {

   const { loadTeams, teams, deleteTeamById, loading, isAuthenticated } = useContext(DataContext);

    useEffect(() => {
       loadTeams();
    }, [loadTeams]);

  

    if (loading) return <Spinner />;
    // if (error) return
    //   <>
    //     <Navbar />
    //     <div className="error-message">
    //       <p>Error: {error}</p>
    //     </div>
    //   </>
  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
      <div className='team-home-container'>
        <div className='actions'>
          <Link to="/addTeam" className='add-team-link'>
            Add New Team
          </Link>            
        </div> 

      {teams && teams.length > 0 ? (
        
        <div className="team-grid">
          {teams.map((team) => (
            <Team key={team.id} team={team} onDelete={deleteTeamById}/>
          ))}
        </div>

      ) : (

      <div className="no-teams">
        <h2>No players found.</h2>  
        <p>Add some players to start tracking their stats!</p>
      </div>

      )}
      </div>
      <Footer />
    </>
    
  )
}

export default TeamHome