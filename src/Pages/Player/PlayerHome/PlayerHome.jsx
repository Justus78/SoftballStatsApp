import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Player from "../../../Components/Player/Player";
import { DataContext } from "../../../Context/DataContext";
import "./PlayerHome.css";
import Spinner from "../../../Components/Spinner/Spinner";
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const PlayerHome = ({ onLogout }) => {
  const { loadPlayers, players, loading, deletePlayerById, isAuthenticated } = useContext(DataContext);

  useEffect(() => {
    loadPlayers(); // Fetch only if players are not already loaded
  }, [loadPlayers]);

  if (loading) return <Spinner />;

  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated}/>
    <div className="player-home-container">
      <div className="actions">
        <Link to="/AddPlayer" className="add-player-link">
          Add New Player
        </Link>
      </div>
      {players && players.length > 0 ? (
        <div className="player-grid">
          {players.map((player) => (
            <Player key={player.id} player={player} onDelete={deletePlayerById} />
          ))}
        </div>
      ) : (

        
          <div className="no-players">
            <h2>No players found.</h2> 
            <p>Add some players to start tracking their stats!</p>
          </div>
        
      )}
      </div>
      <Footer />

    </>
  );
};

export default PlayerHome;
