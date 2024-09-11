// Functionality to create a post

import { API_BASE, API_AUCTION } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

const action = "/listings";
const method = "post";

export async function addListing(data) {
  const addListingURL = API_BASE + API_AUCTION + action;

  try {
    const response = await authFetch(addListingURL, {
      method,
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Response not ok");
    }
  } catch (error) {
    throw new Error(error);
  }
}
