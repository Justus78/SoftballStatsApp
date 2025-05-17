import React, { useContext, useEffect, useState } from 'react';
import './StatsHome.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteStat, getStatsForPlayer } from '../../../Services/StatService';
import { DataContext } from '../../../Context/DataContext';
import altProfilePic from '../../../assets/altProfilePic.jpg'
import { Link } from 'react-router-dom'
import Spinner from '../../../Components/Spinner/Spinner.jsx'
import StatBox from '../../../Components/StatBox/StatBox.jsx';
import StatTable from '../../../Components/StatTable/StatTable.jsx';
import PlayerImage from '../../../Components/PlayerImage/PlayerImage.jsx';
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

export const StatsHome = ( {onLogout} ) => {
    // get the id from the url
    const { id } = useParams();
    const navigate = useNavigate(); // instantiate a navigate variable to navigate pages

    // Context variables
    const { activePlayer, setActivePlayer, players, isAuthenticated,
        loadStats, currentStats, statsCache, setStatsCache } = useContext(DataContext);

    // State variables
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Set active player when id changes
    useEffect(() => {
        setActivePlayer(null); // Reset first
        if (players && players.length > 0) {
            const foundPlayer = players?.find((p) => p.id === parseInt(id)) || null;
            setActivePlayer(foundPlayer);
        }
    }, [id, players, setActivePlayer]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                await loadStats(id);
            } catch (error) {
                setError("Failed to load stats");
            } finally {
                setLoading(false);
            }
        };
        
        fetchStats();
    }, [id, loadStats]);
    

    const handleDelete = (stat) => {
        const confirmed = window.confirm(`Are you sure you want to delete game against ${stat.opponent} on ${stat.gameDate}?`);
        
        if (confirmed) {
            const token = localStorage.getItem("token");
    
            deleteStat(token, stat.id).then(() => {
                // Remove the stat from cache
                setStatsCache((prevCache) => {
                    const updatedCache = new Map(prevCache);
                    const existingStats = updatedCache.get(id) || [];
                    const newStats = existingStats.filter((s) => s.id !== stat.id);
                    updatedCache.set(id, newStats);
                    return updatedCache;
                });
            }).catch((error) => {
                console.error("Failed to delete stat:", error);
            });
        }
    };

    // Handle loading and errors
    if (loading) return <div><Spinner /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
        <div className="stat-container">

            <div className="player-stat-container">
                {/* Player Image */}
                <div className="image-container">
                    {activePlayer?.profilePic ? (
                        <PlayerImage profilePic={activePlayer?.profilePic} firstName={activePlayer?.firstName} />
                        ) : (
                        <img src={altProfilePic} alt="Default Player Image" />
                    )}
                </div>
                <StatBox /> { /*stat box component */}
            </div>

            <div className="stat-list">
                {/* Add more stat details here */}
            </div>

            <div className="stats-table-container">
                <button onClick={() => navigate(`/addStats/${activePlayer.id}`)}
                     className="standard-button">Add New Stat
                </button>

                { /** stat table component */ }
                <StatTable currentStats={currentStats} handleDelete={handleDelete} activePlayer={activePlayer} />
            </div>
            <Footer />
        </div>
        </>
    );
};
