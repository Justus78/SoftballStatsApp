const apiUrl = 'https://softballstatsapi20250111200710.azurewebsites.net/api/stats'; //base api

export const getStatsForPlayer = async (token, playerId) => {
    const url = `${apiUrl}/stat/player/${playerId}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok){
            throw new Error('Failed to get stats');
        }
        
        return await response.json();
    }  catch(err){
        throw new Error(err.message);
    }
};

/**
 * Create a new stat for player.
 * @param {string} token - The JWT token for authentication.
 * @param {object} formData - The data for the new player.
 * @returns {Promise<object>} - The created player.
 */
export const createStats = async (token, newStat) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStat),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.title || "Failed to add stats");
  }

  return response.json();
};


/**
 * Delete a stat by ID.
 * @param {string} token - The JWT token for authentication.
 * @param {number} id - The ID of the player to delete.
 * @returns {Promise<void>} - Resolves if the player is successfully deleted.
 */
export const deleteStat = async (token, id) => {
  try {
    
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete stat');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateStats = async (token, statId, updatedStat) => {
  try {
    console.log(statId, updatedStat)
    const response = await fetch(`${apiUrl}/${statId}`, {
      method: 'PUT',  // PUT request to update an existing stat
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify(updatedStat), // Send the updated stat data
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.title || 'Failed to update stat');
    }

    return await response.json(); // Return the updated stat
  } catch (err) {
    throw new Error(err.message || 'Error updating stat');
  }
};


