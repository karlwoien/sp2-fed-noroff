import { API_BASE, API_AUCTION } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

// Fetches a single auction listing along with its bid details.
export async function getSingleListingWithBids(id) {
  const url = `${API_BASE}${API_AUCTION}/listings/${id}?_bids=true`;

  try {
    const response = await authFetch(url);
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error(
        `Failed to fetch listing with bids: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("Error fetching listing with bids:", error);
    throw new Error(error);
  }
}
