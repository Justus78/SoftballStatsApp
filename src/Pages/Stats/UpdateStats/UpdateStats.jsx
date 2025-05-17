import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../../../Context/DataContext';
import { toast } from 'react-toastify';
import { updateStats } from '../../../Services/StatService'; // Assuming you have a service for updating stats
import './UpdateStats.css'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

const EditStat = ( {onLogout} ) => {
  // make the input fields load with the data
  const { statsCache, setStatsCache, isAuthenticated } = useContext(DataContext);
  const { statId, playerId } = useParams(); // `statId` is the id of the stat to edit
  const navigate = useNavigate();

  const [statData, setStatData] = useState([]);
  const [error, setError] = useState("");

  // useState variables for each field
  const [opponent, setOpponent] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [atBats, setAtBats] = useState('');
  const [hits, setHits] = useState('');
  const [runs, setRuns] = useState('');
  const [RBIs, setRBIs] = useState('');
  const [walks, setWalks] = useState('');
  const [strikeouts, setStrikeouts] = useState('');
  const [stolenBases, setStolenBases] = useState('');
  const [errors, setErrors] = useState('');
  const [singles, setSingles] = useState('');
  const [doubles, setDoubles] = useState('');
  const [triples, setTriples] = useState('');
  const [homeRuns, setHomeRuns] = useState('');
  const [hitByPitch, setHitByPitch] = useState('');
  const [sacrificeBunt, setSacrificeBunt] = useState('');
  const [sacrificeFly, setSacrificeFly] = useState('');


  useEffect(() => {
    // Fetch the stat from the cache or API
    const stat = statsCache.get(playerId)?.find((stat) => stat.id === parseInt(statId));
    if (stat) {
      setStatData(stat);
      //console.log(stat)
      //console.log(statData)

      setOpponent(stat.opponent);
      setGameDate(stat?.gameDate ? stat.gameDate.split("T")[0] : ""); // If gameDate is null or undefined, set it to an empty string      
      setAtBats(stat.atBats);
      setHits(stat.hits);
      setRuns(stat.runs);
      setRBIs(stat.RBIs);
      setWalks(stat.walks);
      setStrikeouts(stat.strikeouts);
      setStolenBases(stat.stolenBases);
      setErrors(stat.errors);
      setSingles(stat.singles);
      setDoubles(stat.doubles);
      setTriples(stat.triples);
      setHomeRuns(stat.homeRuns);
      setHitByPitch(stat.hitByPitch);
      setSacrificeBunt(stat.sacrificeBunt);
      setSacrificeFly(stat.sacrificeFly);


    } else {
      toast.error("Stat not found.");
      navigate(`/playerStats/${playerId}`);
    }
  }, [playerId, statId, statsCache, navigate, setStatData, statData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    

    const newStat = {
      PlayerID: playerId,
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
    }

    try {
      const token = localStorage.getItem("token");
      const updatedStat = await updateStats(token, statId, newStat);

      // Update the cache with the updated stat
      setStatsCache((prevCache) => {
        const updatedCache = new Map(prevCache); // Clone the cache
        const existingStats = updatedCache.get(playerId) || []; // Get stats array for the player
      
        // Map over the existing stats and replace the updated stat
        const updatedStats = existingStats.map((stat) =>
          stat.id === parseInt(statId) ? { ...stat, ...updatedStat } : stat
        );
      
        updatedCache.set(playerId, updatedStats); // Update the cache
        return updatedCache;
      });
      

      toast.success("Stat updated successfully!");
      navigate(`/playerStats/${playerId}`);
    } catch (err) {
      setError(err.message);
      toast.error("Error updating stat, try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/playerStats/${playerId}`);
  };

  if (!statData) return <div>Loading...</div>;

  return (
    <>
    <Navbar onLogout={onLogout} isAuthenticated={isAuthenticated} />
      <div className="update-stat-container">
        <div className="update-stat-form">
          <h2 className="update-stat-title">Edit Player Stat</h2>
          <form onSubmit={handleSubmit}>
          <div className="update-stat-form-grid">
            <div>
              <label htmlFor="Opponent">Opponent</label>
              <input
                type="text"
                id="opponent"
                name="Opponent"
                value={opponent || ""}
                onChange={(e) => setOpponent(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="GameDate">Game Date</label>
              <input
                type="date"
                id="gameDate"
                name="GameDate"
                value={gameDate || ""}
                onChange={(e) => setGameDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="AtBats">At Bats</label>
              <input
                type="number"
                id="atBats"
                name="AtBats"
                value={atBats}
                onChange={(e) => setAtBats(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Hits">Hits</label>
              <input
                type="number"
                id="Hits"
                name="Hits"
                value={hits || 0}
                onChange={(e) => setHits(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Runs">Runs</label>
              <input
                type="number"
                id="Runs"
                name="Runs"
                value={runs || 0}
                onChange={(e) => setRuns(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="RBIs">RBIs</label>
              <input
                type="number"
                id="RBIs"
                name="RBIs"
                value={RBIs || 0}
                onChange={(e) => setRBIs(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Walks">Walks</label>
              <input
                type="number"
                id="Walks"
                name="Walks"
                value={walks || 0}
                onChange={(e) => setWalks(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Strikeouts">Strikeouts</label>
              <input
                type="number"
                id="Strikeouts"
                name="Strikeouts"
                value={strikeouts || 0}
                onChange={(e) => setStrikeouts(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="StolenBases">Stolen Bases</label>
              <input
                type="number"
                id="stolenBases"
                name="StolenBases"
                value={stolenBases || 0}
                onChange={(e) => setStolenBases(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Errors">Errors</label>
              <input
                type="number"
                id="Errors"
                name="Errors"
                value={errors || 0}
                onChange={(e) => setErrors(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Singles">Singles</label>
              <input
                type="number"
                id="Singles"
                name="Singles"
                value={singles || 0}
                onChange={(e) => setSingles(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Doubles">Doubles</label>
              <input
                type="number"
                id="Doubles"
                name="Doubles"
                value={doubles || 0}
                onChange={(e) => setDoubles(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="Triples">Triples</label>
              <input
                type="number"
                id="Triples"
                name="Triples"
                value={triples || 0}
                onChange={(e) => setTriples(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="HomeRuns">Home Runs</label>
              <input
                type="number"
                id="HomeRuns"
                name="HomeRuns"
                value={homeRuns || 0}
                onChange={(e) => setHomeRuns(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="HitByPitch">Hit By Pitch</label>
              <input
                type="number"
                id="HitByPitch"
                name="HitByPitch"
                value={hitByPitch || 0}
                onChange={(e) => setHitByPitch(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="SacrificeFly">Sacrifice Fly</label>
              <input
                type="number"
                id="SacrificeFly"
                name="SacrificeFly"
                value={sacrificeFly || 0}
                onChange={(e) => setSacrificeFly(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="SacrificeBunt">Sacrifice Bunt</label>
              <input
                type="number"
                id="SacrificeBunt"
                name="SacrificeBunt"
                value={sacrificeBunt || 0}
                onChange={(e) => setSacrificeBunt(e.target.value)}
                required
              />
            </div>

            
            </div>

            <div className="button-container">
              <button className='standard-button' type="submit">Update Stats</button>

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

export default EditStat;
