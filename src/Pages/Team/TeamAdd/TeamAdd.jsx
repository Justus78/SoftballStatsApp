import React, { useContext } from 'react'
import "./TeamAdd.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam } from '../../../Services/TeamService';
import { toast } from 'react-toastify'
import { DataContext } from '../../../Context/DataContext';
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const TeamAdd = ( {onLogout} ) => {

    const { teams, loadTeams, setTeams, isAuthenticated} = useContext(DataContext);

    const navigate = useNavigate();

    // useState variables
    const [teamName, setTeamName] = useState("");
    const [teamPic, setTeamPic] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset any previous errors

        //prepare form data
        const formData = new FormData();
        formData.append("teamName", teamName);
        formData.append("teamPic", teamPic);

        try {
            // post request to create a new team
            const token = localStorage.getItem("token");
            const newTeam = await createTeam(token, formData);
            console.log(newTeam); // for debugging

            setTeams([...teams, newTeam])
            
            navigate("/teams");
            toast.success('New team added successfully');
        } catch (err){
            setError(err.message);
            toast.error('Error adding team');
        }
    };

    const handleCancel = () => {
        navigate('/teams');
      };

  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
        <div className="add-team-container">
            <div className='add-team-form'>
                <h2 className="add-team-title">Add Team</h2>
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
                    <button className='standard-button' type="submit">Add Team</button> 

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

export default TeamAdd