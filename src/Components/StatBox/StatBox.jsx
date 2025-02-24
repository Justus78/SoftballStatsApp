import React, { useContext } from 'react'
import './StatBox.css'
import { DataContext } from '../../Context/DataContext'

const StatBox = () => {

    const { currentStats } = useContext(DataContext);
    
    const totalAtBats = currentStats.reduce((sum, stat) => sum + stat.atBats, 0);
    const totalHits = currentStats.reduce((sum, stat) => sum + stat.hits, 0);
    const totalSingles = currentStats.reduce((sum, stat) => sum + stat.singles, 0);
    const totalDoubles = currentStats.reduce((sum, stat) => sum + stat.doubles, 0);
    const totalTriples = currentStats.reduce((sum, stat) => sum + stat.triples, 0);
    const totalHomeRuns = currentStats.reduce((sum, stat) => sum + stat.homeRuns, 0);
    const totalRBIs = currentStats.reduce((sum, stat) => sum + stat.rbIs, 0);
    const totalRunsScored = currentStats.reduce((sum, stat) => sum + stat.runs, 0);
    const totalWalks = currentStats.reduce((sum, stat) => sum + stat.walks, 0);
    const totalStrikeouts = currentStats.reduce((sum, stat) => sum + stat.strikeouts, 0);
    const totalStolenBases = currentStats.reduce((sum, stat) => sum + stat.stolenBases, 0);
    const battingAverage = totalAtBats > 0 ? (totalHits / totalAtBats).toFixed(3) : "N/A";


  return (
    <>
        <div className="stat-box">
            <div className="stat-item">At Bats: {totalAtBats}</div>
            <div className="stat-item">Hits: {totalHits}</div>
            <div className="stat-item">Batting Avg: {battingAverage}</div>
            <div className="stat-item">Singles: {totalSingles}</div>
            <div className="stat-item">Doubles: {totalDoubles}</div>
            <div className="stat-item">Triples: {totalTriples}</div>
            <div className="stat-item">Home Runs: {totalHomeRuns}</div>
            <div className="stat-item">RBIs: {totalRBIs}</div>
            <div className="stat-item">Runs: {totalRunsScored}</div>
            <div className="stat-item">Walks: {totalWalks}</div>
            <div className="stat-item">Strikeouts: {totalStrikeouts}</div>
            <div className="stat-item">Stolen Bases: {totalStolenBases}</div>
        </div>
    </>
  )
}

export default StatBox