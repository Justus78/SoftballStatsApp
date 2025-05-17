import React from 'react'
import './StatTable.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const StatTable = ({ currentStats, handleDelete, activePlayer}) => {
    const navigate = useNavigate();
  return (
    <>
        {/* Stats Table */}
        <div className='table-container'>
            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Opponent</th>
                        <th>At Bats</th>
                        <th>Hits</th>
                        <th>Home Runs</th>
                        <th>RBIs</th>
                        <th>Runs</th>
                        <th>Strikeouts</th>
                        <th>Stolen Bases</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStats.length > 0 ? (
                        currentStats.map((stat) => (
                            <tr key={stat.id}>
                                <td>{stat.gameDate ? stat.gameDate.split("T")[0] : null}</td>
                                <td>{stat.opponent}</td>
                                <td>{stat.atBats}</td>
                                <td>{stat.hits}</td>
                                <td>{stat.homeRuns}</td>
                                <td>{stat.rbIs}</td>
                                <td>{stat.runs}</td>
                                <td>{stat.strikeouts}</td>
                                <td>{stat.stolenBases}</td>
                                <td>
                                    <div className='button-group'>
                                        <button className='standard-button' onClick={() => navigate(`/updateStats/${stat.id}/${activePlayer.id}`)}>Edit</button>
                                        <button className='standard-button' onClick={() => handleDelete(stat)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No stats available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </> 
 )
}

export default StatTable