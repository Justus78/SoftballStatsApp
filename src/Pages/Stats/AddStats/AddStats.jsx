import React, { useContext, useState } from 'react';
import './AddStats.css';
import { useNavigate, useParams } from 'react-router-dom';
import { createStats } from '../../../Services/StatService';
import { toast } from 'react-toastify';
import { DataContext } from '../../../Context/DataContext';
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const AddStats = ( { onLogout } ) => {

  const { statsCache, setStatsCache, currentStats, isAuthenticated } = useContext(DataContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [opponent, setOpponent] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [atBats, setAtBats] = useState(0);
  const [hits, setHits] = useState(0);
  const [runs, setRuns] = useState(0);
  const [RBIs, setRBIs] = useState(0);
  const [walks, setWalks] = useState(0);
  const [strikeouts, setStrikeouts] = useState(0);
  const [stolenBases, setStolenBases] = useState(0);
  const [errors, setErrors] = useState(0);
  const [singles, setSingles] = useState(0);
  const [doubles, setDoubles] = useState(0);
  const [triples, setTriples] = useState(0);
  const [homeRuns, setHomeRuns] = useState(0);
  const [hitByPitch, setHitByPitch] = useState(0);
  const [sacrificeFly, setSacrificeFly] = useState(0);
  const [sacrificeBunt, setSacrificeBunt] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const newStat = {
      PlayerID: id,
      Opponent: opponent,
      GameDate: gameDate,
      AtBats: atBats,
      Hits: hits,
      Runs: runs,
      RBIs: RBIs,
      Walks: walks,
      Strikeouts: strikeouts,
      StolenBases: stolenBases,
      Errors: errors,
      Singles: singles,
      Doubles: doubles,
      Triples: triples,
      HomeRuns: homeRuns,
      HitByPitch: hitByPitch,
      SacrificeFly: sacrificeFly,
      SacrificeBunt: sacrificeBunt,
    };

    try {
      const token = localStorage.getItem("token");
      const addedStat = await createStats(token, newStat);

       // Update the statsCache
       setStatsCache((prevCache) => {
        const updatedCache = new Map(prevCache);
        const existingStats = updatedCache.get(id) || [];
        updatedCache.set(id, [...existingStats, addedStat]);
        return updatedCache;
      });


      toast.success("New stats added successfully!");
      navigate(`/playerStats/${id}`);
    } catch (err) {
      setError(err.message);
      toast.error("Error creating stats, try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/playerStats/${id}`);
  };

  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
      <div className="add-stat-container">
        <div className="add-stat-form">
          <h2 className="add-stat-title">Add Player Stats</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                {[
                  { label: "Opponent", state: opponent, setState: setOpponent, type: "text" },
                  { label: "Game Date", state: gameDate, setState: setGameDate, type: "date" },
                  { label: "At Bats", state: atBats, setState: setAtBats, type: "number" },
                  { label: "Hits", state: hits, setState: setHits, type: "number" },
                  { label: "Runs", state: runs, setState: setRuns, type: "number" },
                  { label: "RBIs", state: RBIs, setState: setRBIs, type: "number" },
                  { label: "Walks", state: walks, setState: setWalks, type: "number" },
                  { label: "Strikeouts", state: strikeouts, setState: setStrikeouts, type: "number" },
                  { label: "Stolen Bases", state: stolenBases, setState: setStolenBases, type: "number" },
                  { label: "Errors", state: errors, setState: setErrors, type: "number" },
                  { label: "Singles", state: singles, setState: setSingles, type: "number" },
                  { label: "Doubles", state: doubles, setState: setDoubles, type: "number" },
                  { label: "Triples", state: triples, setState: setTriples, type: "number" },
                  { label: "Home Runs", state: homeRuns, setState: setHomeRuns, type: "number" },
                  { label: "Hit By Pitch", state: hitByPitch, setState: setHitByPitch, type: "number" },
                  { label: "Sacrifice Fly", state: sacrificeFly, setState: setSacrificeFly, type: "number" },
                  { label: "Sacrifice Bunt", state: sacrificeBunt, setState: setSacrificeBunt, type: "number" },
                ].map(({ label, state, setState, type }, index) => (
                  <div key={index}>
                    <label htmlFor={label.toLowerCase().replace(" ", "")}>{label}</label>
                    <input
                      type={type}
                      id={label.toLowerCase().replace(" ", "")}
                      value={state}
                      onChange={(e) => setState(type === "number" ? Number(e.target.value) : e.target.value)}
                      required
                    />
                  </div>
                
                ))}
                </div>
                <div className="button-container">
                  <button type="submit">Add Stats</button>

                  <button type="button" onClick={handleCancel}>
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

export default AddStats;
