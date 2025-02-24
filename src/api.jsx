// src/api.js
export const apiUrl = "https://softballstatsapi20250111200710.azurewebsites.net/api/account";

// Utility function to make a POST request to the API
export async function postToApi(endpoint, data) {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      let errorMessage = "Something went wrong";

      // If the response is an array of errors, extract descriptions
      if (Array.isArray(result)) {
        errorMessage = result.map(err => err.description).join(" "); // Combine all error messages
      } else if (result.message) {
        errorMessage = result.message;
      } else if (result.errors) {
        errorMessage = Object.values(result.errors).flat().join(" ");
      }

      return { error: errorMessage };
    }

    return { data: result }; // Success response
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Network error. Please try again." };
  }
}
