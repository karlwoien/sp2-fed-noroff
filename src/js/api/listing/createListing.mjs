import { API_BASE, API_AUCTION } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

const LISTINGS_PATH = "/listings";
const method = "post";

/**
 * Adds a new listing by sending the provided data to the API.
 *
 * @param {object} data - The listing data to be added.
 * @returns {object} - The response data from the API if the request is successful.
 * @throws Will throw an error if the API request fails.
 */

export async function addListing(data) {
  const addListingURL = API_BASE + API_AUCTION + LISTINGS_PATH;

  try {
    const response = await authFetch(addListingURL, {
      method,
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Failed to add listing: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    throw new Error(
      `An error occurred while adding the listing: ${error.message}`,
    );
  }
}
