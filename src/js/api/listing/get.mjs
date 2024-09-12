import { API_BASE, API_AUCTION } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

const action = "/listings";

// Function to get all listings, or filter by search or sort order
export async function getListings(query = "", filter = "latest") {
  let getListingsURL;

  // Use the search endpoint if a search query is provided
  if (query) {
    getListingsURL = `${API_BASE}${API_AUCTION}/listings/search?q=${encodeURIComponent(query)}`;
  } else {
    // Use the regular endpoint if there's no search query
    getListingsURL = `${API_BASE}${API_AUCTION}/listings`;
  }

  const params = new URLSearchParams();

  // Add sorting options based on filter
  if (filter === "latest") {
    params.append("_sort", "created:desc");
  } else if (filter === "endSoon") {
    params.append("_sort", "endsAt:asc");
  } else if (filter === "popular") {
    params.append("_sort", "_count.bids:desc");
  }

  // Append the query parameters for sorting
  if (params.toString()) {
    if (getListingsURL.includes("?")) {
      getListingsURL += `&${params.toString()}`;
    } else {
      getListingsURL += `?${params.toString()}`;
    }
  }

  try {
    const response = await authFetch(getListingsURL);
    if (response.ok) {
      const { data } = await response.json();

      const now = new Date();

      if (filter === "latest") {
        // Manually sort by created date
        const sortedListings = data.sort(
          (a, b) => new Date(b.created) - new Date(a.created),
        );

        // Now filter for active listings after sorting
        const activeListings = sortedListings.filter(
          (listing) => new Date(listing.endsAt) > now,
        );
        return activeListings;
      }

      // Filter for active listings that haven't ended yet
      const activeListings = data.filter(
        (listing) => new Date(listing.endsAt) > now,
      );

      // Apply client-side sorting for ending soon and popular
      if (filter === "endSoon") {
        activeListings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
      } else if (filter === "popular") {
        activeListings.sort((a, b) => b._count.bids - a._count.bids);
      }

      return activeListings;
    } else {
      console.error("Error fetching listings:", response.status);
    }
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

// Functionality to get single listing by id
const user = "?_seller=true&_bids=true";

export async function getListing(id) {
  if (!id) {
    throw new Error("Get listing requires a listing ID");
  }

  const getListingURL = `${API_BASE}${API_AUCTION}${action}/${id}${user}`;

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
