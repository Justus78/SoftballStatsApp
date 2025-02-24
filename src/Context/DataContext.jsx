import React, { createContext, useState, useCallback } from "react";
import { fetchPlayers, deletePlayer } from "../Services/PlayerService";
import { deleteTeam, fetchTeams } from "../Services/TeamService";
import { toast } from "react-toastify";
import { deleteStat, getStatsForPlayer } from "../Services/StatService";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [players, setPlayers] = useState([]); // `null` initially to check if data is fetched
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePlayer, setActivePlayer] = useState();
  const [currentStats, setCurrentStats] = useState([]);
  const [statsCache, setStatsCache] = useState(new Map()); // map to keep track of stats fetched
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication token is missing");
    return token;
  };


  // functions for player
  const loadPlayers = useCallback(async () => {
    if (players && players.length > 0) return; // Prevent redundant API calls

    setLoading(true);
    try {
      const token = getToken();

      const data = await fetchPlayers(token);
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePlayerById = async (playerId) => {
    try {
      const token = getToken();

      await deletePlayer(token, playerId);
      setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== playerId));
      toast.success("Player deleted successfully!");

    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };


  // functions for teams
  const loadTeams = useCallback(async () => {
    if (teams && teams.length > 0) return; // Prevent redundant API calls

    setLoading(true);
    try {
      const token = getToken();

      const data = await fetchTeams(token);
      setTeams(data);
      console.log('made it to the set teams');
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTeamById = async (teamId) => {
    try {
      const token = getToken();

      await deleteTeam(token, teamId);
      setTeams((prevTeams) => prevTeams.filter((t) => t.id !== teamId));
      toast.success("Team deleted successfully!");
    } catch (error) {
      console.error("Error deleting Team:", error);
    }
  };

  // functions for stats
  const loadStats = useCallback(async (playerId) => {
    if(!playerId) return;

    console.log(statsCache);
    if(statsCache.has(playerId)) {
     // console.log("Using cached stats for player:", playerId);
      setCurrentStats(statsCache.get(playerId));
      return;
    }

    setLoading(true);
    try {
      //console.log("Fetching stats from API for player:", playerId);
      const token = getToken();

      const data = await getStatsForPlayer(token, playerId);

      setStatsCache((prevCache) => new Map(prevCache).set(playerId, data)); // add the new stats to the stat cache
      setCurrentStats(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  }, [statsCache]);

  const deleteStatById = async (statId, playerId) => {
    try {
      const token = getToken();

      await deleteStat(token, statId);
      setCurrentStats((prevStats) => prevStats.filter((s) => s.id !== statId));

      // Update statsCache as well
      setStatsCache((prevCache) => {
        const newCache = new Map(prevCache);
        const updatedStats = newCache.get(playerId)?.filter((s) => s.id !== statId) || [];
        return newCache;
      });
      
      toast.success("Stat deleted successfully!");
    } catch (error) {
      console.error("Error deleting Stat:", error);
    }
  };
  

  return (
    <DataContext.Provider value={{ players, loadPlayers, loading, deletePlayerById, 
                                  teams, loadTeams, deleteTeamById, setPlayers, setTeams,
                                  activePlayer, setActivePlayer, loadStats, deleteStatById,
                                  currentStats, statsCache, setStatsCache, isAuthenticated, setIsAuthenticated }}>
      {children}
    </DataContext.Provider>
  );
};
