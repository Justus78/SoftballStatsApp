import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Player.css';
import altProfilePic from '../../../src/assets/altProfilePic.jpg';

const Player = ({ player, onDelete }) => {

  const navigate = useNavigate();

    const handleDelete = () => {
        const confirmed = window.confirm(`Are you sure you want to delete ${player.firstName} ${player.lastName}?`);
        if (confirmed) {
            onDelete(player.id);
        }
    };

  return (
    <div className="player-card">
      <img
        src={player.profilePic || altProfilePic} // Fallback for missing photo
        alt={`${player.firstName} ${player.lastName}`}
        className="player-photo"
      />
      <div className="player-details">
        <h2>{player.firstName} {player.lastName}</h2>
        <p>{player.position}</p>
      </div>
      <div className='button-group'>
        <button className='standard-button' onClick={ () => navigate(`/updatePlayer/${player.id}`)}>Edit Player</button>
        <button className='standard-button' onClick={ () => navigate(`/playerStats/${player.id}`)}>See Stats</button>
        <button className='standard-button' onClick={ () => handleDelete()}>Delete Player</button>
      </div>
    </div>
  );
};

export default Player;