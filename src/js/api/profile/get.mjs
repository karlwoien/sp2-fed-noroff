import { authFetch } from "../fetch.mjs";
import { load } from "../../storage/index.mjs";
import { API_BASE, API_AUCTION } from "../constants.mjs";

const PROFILE_PATH = "/profiles";

// Fetches the user profile based on the stored profile name

export async function getProfile() {
  const { name } = load("profile");

  if (!name) {
    throw new Error("No profile name provided");
  }

  const getProfileUrl = API_BASE + API_AUCTION + PROFILE_PATH + "/" + name;

  const response = await authFetch(getProfileUrl);
  return await response.json();
}
