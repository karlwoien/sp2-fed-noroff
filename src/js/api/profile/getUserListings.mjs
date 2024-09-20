import { authFetch } from "../fetch.mjs";
import { load } from "../../storage/index.mjs";
import { API_BASE, API_AUCTION } from "../../api/constants.mjs";

const PROFILE_PATH = "/profiles";

// Fetches all listings created by the logged-in user.
export async function getUserListings() {
  const { name } = load("profile");

  if (!name) {
    throw new Error("No profile loaded. Please log in.");
  }

  const listingsUrl = `${API_BASE}${API_AUCTION}${PROFILE_PATH}/${name}/listings`;

  const response = await authFetch(listingsUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user listings: ${response.status} ${response.statusText}`,
    );
  }

  const result = await response.json();
  return result.data;
}
