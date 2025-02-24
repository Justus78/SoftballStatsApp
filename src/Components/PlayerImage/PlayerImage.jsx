import React from 'react'
import './PlayerImage.css'

const PlayerImage = ({ profilePic, firstName}) => {
  return (
        <div className="image-container">
            <img src={profilePic || altProfilePic} alt={firstName || "Default Player"} />
        </div>  
    )
}

export default PlayerImage