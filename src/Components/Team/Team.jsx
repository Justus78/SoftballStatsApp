import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Team.css'
import altProfilePic from '../../assets/altProfilePic.jpg'

const Team = ({ team, onDelete }) => {

  const navigate = useNavigate();

 const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${team.teamName}?`);
      if (confirmed) {
        onDelete(team.id);
    }
  };

  return (
    <div key={team.id} className="team-card">
              <img
                src={team.teamPic || altProfilePic} // Fallback for missing photo
                alt={`${team.teamName}`}
                className="team-photo"
              />
              <div className="team-details">
                <h2>{team.teamName}</h2>
                
              </div>
              <div className='button-group'>
                <button className='standard-button' onClick={ () => navigate(`/updateTeam/${team.id}`)}>Edit Team</button>
                <button className='standard-button' onClick={ () => handleDelete()}>Delete Team</button>
              </div>
            </div>
  )
}

export default Team