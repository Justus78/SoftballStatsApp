import React, { useState, useEffect, useContext } from 'react'
import "./AddPlayer.css"
import { createPlayer } from '../../../Services/PlayerService.Jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataContext } from '../../../Context/DataContext';
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const AddPlayer = ({ onLogout }) => {

    const { teams, loadTeams, loadPlayers, players, setPlayers, isAuthenticated} = useContext(DataContext);

    const navigate = useNavigate();
    
    // useState variables
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [Number, setNumber] = useState();
    const [position, setPosition] = useState("");
    const [teamId, setTeamId] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
      
      if( !teams || teams.length === 0){
        console.log(`getting ready to call load teams `);
        loadTeams();
      }
    }, [teams, loadTeams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset any previous errors
    
        // Prepare the form data
        const formData = new FormData();
        formData.append("FirstName", FirstName); // Use exact backend field names
        formData.append("LastName", LastName);
        if(profilePic) formData.append("profilePic", profilePic); // Attach the file
        formData.append("Number", Number);
        formData.append("position", position);
        formData.append("teamId", teamId || "");
    
        try {
            // Send a POST request to the server with the form data
            const token = localStorage.getItem("token");
            const newPlayer = await createPlayer(token, formData); // Pass FormData

            setPlayers([...players,  newPlayer]);
            //loadPlayers();
            navigate("/players");
            toast.success('Player created successfully.');

        } catch (err) {
            setError(err.message);
            toast.error('Error creating player, try again.');
        }
    };

    const handleCancel = () => {
      navigate('/players');
    };

  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
      <div className="add-player-container">
        <div className='add-player-form'>
          <h2 className="add-player-title">Add Player</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Two-Column Layout */}
              <div className="add-player-form-grid">
                  <div>
                      <label htmlFor="firstName"></label>
                      <input
                          type="text"
                          id="firstName"
                          placeholder='First Name'
                          value={FirstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                      />
                  </div>

                  <div>
                      <label htmlFor="lastName"></label>
                      <input
                          type="text"
                          id="lastName"
                          placeholder='Last Name'
                          value={LastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                      />
                  </div>

                  <div>
                      <label htmlFor="position"></label>
                      <input
                          type="text"
                          id="position"
                          placeholder='Position'
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          required
                      />
                  </div>

                  <div>
                      <label htmlFor="number"></label>
                      <input
                          type="text"
                          id="number"
                          placeholder='Number'
                          value={Number}
                          onChange={(e) => setNumber(e.target.value)}
                          required
                      />
                  </div>

                  <div className="profile-pic-container">
                      <label htmlFor="profilePic">Player Photo</label>
                      <input
                          className="profile-pic-input"
                          type="file"
                          id="profilePic"
                          onChange={(e) => setProfilePic(e.target.files[0])}
                      />
                  </div>

                  <div className="team-container">
                      <label htmlFor="teamId">
                        Team
                      </label>
                      <select id="teamId" value={teamId} onChange={(e) => setTeamId(e.target.value)} >
                          <option value="">Select a team</option>
                          {teams.map((team) => (
                              <option key={team.id} value={team.id}>{team.teamName}</option>
                          ))}
                      </select>
                  </div>
                </div>

              {/* Submit Button */}
              <div className="button-container">
                  <button className='standard-button' type="submit">Add Player</button>

                  <button className='standard-button' type="button" onClick={handleCancel}>
                    Cancel
                  </button>
              </div>
          </form>

        </div>
      </div>
    <Footer />
    </>
  )
}

export default AddPlayer;