import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlayerById, updatePlayer } from '../../../Services/PlayerService.Jsx';
import './PlayerUpdate.css';
import { toast } from 'react-toastify';
import { DataContext } from '../../../Context/DataContext';
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const PlayerUpdate = ( {onLogout} ) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { players, setPlayers, teams, loadTeams, isAuthenticated } = useContext(DataContext);

  const [player, setPlayer] = useState(null); // `null` to represent loading state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState(null); // Use `null` for files
  const [number, setNumber] = useState('');
  const [position, setPosition] = useState('');
  const [teamId, setTeamId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {        
    if( !teams || teams.length === 0){
      console.log(`getting ready to call load teams `);
      loadTeams();
    }
  }, [teams, loadTeams]);

  useEffect(() => {
   // Check if player exists in context before making an API call
   const existingPlayer =  players.length > 0 ? players.find((p) => p.id === parseInt(id)) : null;
   if (existingPlayer) {
    
    console.log("found existing player"); // for debugging
     setPlayer(existingPlayer);
     setFirstName(existingPlayer.firstName || '');
     setLastName(existingPlayer.lastName || '');
     setNumber(existingPlayer.number || '');
     setPosition(existingPlayer.position || '');
     setTeamId(existingPlayer.teamId || '');
     setLoading(false);

   } else {
     // Fetch from API if not found in context
     const getPlayer = async () => {
      console.log("made it to get player") // for debugging
       try {
         const token = localStorage.getItem('token');
         if (!token) throw new Error('Authentication token is missing');
         const data = await fetchPlayerById(token, id);
         setPlayer(data);
         setFirstName(data.firstName || '');
         setLastName(data.lastName || '');
         setNumber(data.number || '');
         setPosition(data.position || '');
         setTeamId(data.teamId || '');
         
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
     getPlayer();
   }
 }, [id, players]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('FirstName', firstName);
    formData.append('LastName', lastName);
    if (profilePic) formData.append('profilePic', profilePic);
    formData.append('Number', number);
    formData.append('position', position);
    formData.append('teamId', teamId || "");

    try {
      const token = localStorage.getItem('token');
      //console.log(Array.from(formData.entries())) debugging
      await updatePlayer(token, id, formData);

      // Update context with new player data
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) => (p.id === parseInt(id) ? { ...p, firstName, lastName, Number, position, teamId } : p))
      );

      navigate('/players');
      toast.success('Player updated successfully.');

    } catch (err) {
      setError(err.message);
      toast.error('Error updating player.');
    }
  };

  const handleCancel = () => {
    navigate('/players');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
      <div className="update-player-container">
        <div className="update-player-form">
          <h2 className="update-player-title">Update Player</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="update-player-form-grid">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="number">Jersey Number</label>
                <input
                  type="number"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="profilePic">Player Picture</label>
                <input
                className='profile-pic-input'
                  type="file"
                  id="profilePic"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>

              <div className="team-container">
                <label htmlFor="teamId">
                  Team
                </label>
                <select id="teamId" value={teamId} onChange={(e) => setTeamId(e.target.value)} required>
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.teamName}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="button-container">
              <button className='standard-button' type="submit">
                Update
              </button>

              <button className='standard-button' type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default PlayerUpdate;
