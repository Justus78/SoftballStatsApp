import React from 'react'
import { Link } from 'react-router-dom'
import './Team.css'
import altProfilePic from '../../assets/altProfilePic.jpg'

const Team = ({ team, onDelete }) => {

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
                <Link className='button-group-btn' to={`/updateTeam/${team.id}`}>Edit Team</Link>
                <Link className='button-group-btn' onClick={handleDelete}>Delete Team</Link>
              </div>
            </div>
  )
}

export default Team