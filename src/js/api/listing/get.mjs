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
