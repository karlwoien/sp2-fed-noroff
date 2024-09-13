// getUserListings.mjs

import { authFetch } from "../fetch.mjs";
import { load } from "../../storage/index.mjs";
import { API_BASE, API_AUCTION } from "../../api/constants.mjs";

const action = "/profiles";

// Fetch listings created by the user
export async function getUserListings() {
  const { name } = load("profile");

  if (!name) {
    throw new Error("No profile loaded");
  }

  const listingsUrl = `${API_BASE}${API_AUCTION}${action}/${name}/listings`;

  const response = await authFetch(listingsUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }

  const result = await response.json();
  return result.data;
}
