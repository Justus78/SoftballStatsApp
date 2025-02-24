const apiUrl = 'https://softballstatsapi20250111200710.azurewebsites.net/api/player'; //base api

/**
 * Fetch all players for the authenticated user.
 * @param {string} token - The JWT token for authentication.
 * @param {object} query - Optional query parameters for filtering players.
 * @returns {Promise<object[]>} - List of players.
 */
export const fetchPlayers = async (token, query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const url = `${apiUrl}?${queryString}`;

  try {    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Correct format
        },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch players');
      
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Fetch a single player by ID.
 * @param {string} token - The JWT token for authentication.
 * @param {number} id - The ID of the player to fetch.
 * @returns {Promise<object>} - The player data.
 */
export const fetchPlayerById = async (token, id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch player');
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Create a new player.
 * @param {string} token - The JWT token for authentication.
 * @param {object} formData - The data for the new player.
 * @returns {Promise<object>} - The created player.
 */
export const createPlayer = async (token, formData) => {
  const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`, // Don't set Content-Type for FormData
      },
      body: formData,
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.title || "Failed to create player");
  }

  return response.json();
};


/**
 * Update an existing player.
 * @param {string} token - The JWT token for authentication.
 * @param {number} id - The ID of the player to update.
 * @param {object} playerData - The updated player data.
 * @returns {Promise<object>} - The updated player.
 */
export const updatePlayer = async (token, id, formData) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.Error);
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Delete a player by ID.
 * @param {string} token - The JWT token for authentication.
 * @param {number} id - The ID of the player to delete.
 * @returns {Promise<void>} - Resolves if the player is successfully deleted.
 */
export const deletePlayer = async (token, id) => {
  try {
    console.log(token)
    console.log(id)
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete player');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
