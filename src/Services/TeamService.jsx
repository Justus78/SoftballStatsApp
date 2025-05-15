const apiUrl = 'https://softballstats20250514213612.azurewebsites.net/api/team'; // base api

/**
 * Fetch all teams for the authenticated user.
 * @param {string} token - The JWT token for authentication.
 * @param {object} query - Optional query parameters for filtering players.
 * @returns {Promise<object[]>} - List of players.
 */

export const fetchTeams = async (token, query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    const url = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok){
            throw new Error('failed to fetch teams');
        }

        return await response.json();

    } catch (err){
        throw new Error(err.message);
    }
}; // end fetch teams

/**
 * Fetch a single team by ID.
 * @param {string} token - The JWT token for authentication.
 * @param {number} id - The ID of the player to fetch.
 * @returns {Promise<object>} - The player data.
 */
export const fetchTeamById = async (token, id) => {
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
 * Create a new team.
 * @param {string} token - The JWT token for authentication.
 * @param {object} playerData - The data for the new player.
 * @returns {Promise<object>} - The created player.
 */
export const createTeam = async (token, formData) => {
  const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`, // Don't set Content-Type for FormData
      },
      body: formData,
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.title || "Failed to create team");
  }

  return response.json();
};

/**
 * Update an existing team.
 * @param {string} token - The JWT token for authentication.
 * @param {number} id - The ID of the player to update.
 * @param {object} playerData - The updated player data.
 * @returns {Promise<object>} - The updated player.
 */
export const updateTeam = async (token, id, formData) => {
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
 * Delete a team by ID.
 * @param {string} token - The JWT token for authentication.
 * @param {number} id - The ID of the player to delete.
 * @returns {Promise<void>} - Resolves if the player is successfully deleted.
 */
export const deleteTeam = async (token, id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete team');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};