import { API_BASE, API_AUCTION } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

const LISTINGS_PATH = "/listings";
const SEARCH_PATH = "/listings/search";
const USER_QUERY = "?_seller=true&_bids=true";

/**
 * Fetches all listings, with optional filters for search query and sort order.
 *
 * @param {string} query - Search query to filter listings by title or description.
 * @param {string} filter - Sorting filter.
 * @returns {Array} - A list of active listings based on the applied filters.
 */
export async function getListings(query = "", filter = "latest") {
  let getListingsURL;

  // Use the search endpoint if a search query is provided, otherwise use the regular listings endpoint
  getListingsURL = query
    ? `${API_BASE}${API_AUCTION}${SEARCH_PATH}?q=${encodeURIComponent(query)}`
    : `${API_BASE}${API_AUCTION}${LISTINGS_PATH}`;

  const params = new URLSearchParams();

  // Append sorting options based on the filter
  switch (filter) {
    case "endSoon":
      params.append("_sort", "endsAt:asc");
      break;
    case "popular":
      params.append("_sort", "_count.bids:desc");
      break;
    default:
      params.append("_sort", "created:desc"); // Default is "latest"
      break;
  }

  // Add sorting parameters to the URL
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
    const now = new Date();

    // Filter for active listings (listings that have not ended)
    const activeListings = data.filter(
      (listing) => new Date(listing.endsAt) > now,
    );

    // Sort listings based on the applied filter
    switch (filter) {
      case "endSoon":
        activeListings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
        break;
      case "popular":
        activeListings.sort((a, b) => b._count.bids - a._count.bids);
        break;
      default:
        activeListings.sort(
          (a, b) => new Date(b.created) - new Date(a.created),
        ); // Sort by latest
        break;
    }

    return activeListings;
  } catch (error) {
    console.error("Error fetching listings:", error);
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
    console.error("Error fetching listing:", error);
    throw new Error(error);
  }
}
