import { API_BASE, API_AUCTION } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

const LISTINGS_PATH = "/listings";
const SEARCH_PATH = "/listings/search";
const USER_QUERY = "?_seller=true&_bids=true";

/**
 * Fetches all listings, with optional filters for search query and sort order.
 *
 * @param {string} query - Search query to filter listings by title or description.
 * @param {string} filter - Sorting filter, either latest or end soon.
 * @returns {Array} - A list of listings based on the applied filters.
 */
export async function getListings(query = "", filter = "latest") {
  let getListingsURL;

  // Use the search endpoint if a search query is provided, otherwise use the regular listings endpoint
  getListingsURL = query
    ? `${API_BASE}${API_AUCTION}${SEARCH_PATH}?q=${encodeURIComponent(query)}`
    : `${API_BASE}${API_AUCTION}${LISTINGS_PATH}`;

  const params = new URLSearchParams();

  // Conditionally append active listings filter if filter is "endSoon"
  if (filter === "endSoon") {
    params.append("_active", "true");
  }

  // Append sorting options based on the filter
  switch (filter) {
    case "endSoon":
      params.append("sort", "endsAt");
      params.append("sortOrder", "asc");
      break;
    default:
      params.append("sort", "created");
      params.append("sortOrder", "desc");
      break;
  }

  // Add query parameters to the URL
  if (params.toString()) {
    getListingsURL += getListingsURL.includes("?")
      ? `&${params.toString()}`
      : `?${params.toString()}`;
  }

  try {
    const response = await authFetch(getListingsURL);
    if (!response.ok) {
      throw new Error(`Error fetching listings: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Fetches a single listing by its ID, including seller and bids information.
 *
 * @param {string} id - The ID of the listing to retrieve.
 * @returns {object} - The data of the specific listing, including seller and bids.
 * @throws Will throw an error if the listing ID is not provided or if the request fails.
 */
export async function getListing(id) {
  if (!id) {
    throw new Error("Get listing requires a listing ID");
  }

  const getListingURL = `${API_BASE}${API_AUCTION}${LISTINGS_PATH}/${id}${USER_QUERY}`;

  try {
    const response = await authFetch(getListingURL);
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error(`Error fetching listing: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(error);
  }
}
