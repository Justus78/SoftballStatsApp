import React, { useContext, useEffect, useState } from 'react'
import "./TeamUpdate.css"
import { useNavigate, useParams } from 'react-router-dom'
import { updateTeam } from '../../../Services/TeamService';
import { toast } from 'react-toastify';
import { DataContext } from '../../../Context/DataContext';
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const TeamUpdate = ( {onLogout} ) => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { teams, setTeams, isAuthenticated } = useContext(DataContext);

  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamPic, setTeamPic] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    //check to see if the team is in the teams context variable
    const existingTeam = teams.find((t) => t.id === parseInt(id));
    if(existingTeam) {

      console.log("found existing team");
      setTeam(existingTeam);
      setTeamName(existingTeam.teamName || '');
      
      setLoading(false);
    } else {

    const getTeam = async () => {
      try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error('Authentication token is missing');
      const data = await fetchTeamById(token, id);

      setTeam(data);
      setTeamName(data.teamName || '')
      setTeamPic(data.teamPic || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTeam();
    }
  }, [id, teams])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append("teamName", teamName);
     if (teamPic) formData.append("teamPic", teamPic);

    try {
      // put request to update the team
      const token = localStorage.getItem("token");
      if (!token) throw new Error('Authentication token is missing');
      const data = await updateTeam(token, id, formData);
      console.log(data);
      toast.success('Team updated successfully');
      navigate('/teams');
    } catch (err){
      setError(err.message);
      toast.error('Failed to update team');
    }
  }

  const handleCancel = () => {
    navigate('/teams');
  };

  return (
        <>
        <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
          <div className="update-team-container">
            <div className='update-team-form'>
              <h2 className="update-team-title">Update Team</h2>
              <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div>
                  <label htmlFor="teamName" >Team Name</label>
                  <input
                      type="text"
                      id="teamName"
                      placeholder="Team Name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      required />
              </div>
            
              <div>
                  <label htmlFor="profilePic" >Team Logo</label>
                  <input
                      type="file"
                      id="teamPic"
                      placeholder=""
                      onChange={(e) => setTeamPic(e.target.files[0])} // Update to use `files[0]`
                       />
                </div>

                <div className="button-container">
                  <button className='standard-button' type="submit">Update</button>      

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

export default TeamUpdate