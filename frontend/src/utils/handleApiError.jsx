/**
 * handleApiError
 *
 * A helper function to process and return a user-friendly error message.
 *
 * @param {Object} error - The error object caught in a try-catch block or a rejected promise.
 * @returns {string} - A descriptive error message for the user.
 */
export function handleApiError(error) {
    if (error.response) {
        // Server responded with an error status code
        return `Error fetching data: ${error.response.data?.message || "Unknown server error."}`;
    } else if (error.request) {
        // Request was made but no response was received
        return "Network error: Please check your connection.";
    } else {
        // Other errors (e.g., code issues)
        return `An error occurred: ${error.message}`;
    }
}
