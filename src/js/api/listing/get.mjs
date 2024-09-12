import { API_BASE, API_AUCTION } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

//Functionality to get all listings

const action = "/listings";

export async function getListings() {
  const getListingsURL = API_BASE + API_AUCTION + action;

  try {
    const response = await authFetch(getListingsURL);
    if (response.ok) {
      const { data } = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error("Error getting listings: ", error);
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
