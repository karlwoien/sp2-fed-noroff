import { authFetch } from "../fetch.mjs";
import { load } from "../../storage/index.mjs";
import { API_BASE, API_AUCTION } from "../constants.mjs";

const action = "/profiles";

export async function getProfile() {
  const { name } = load("profile");

  if (!name) {
    throw new Error("No ID provided");
  }

  const getProfileUrl = API_BASE + API_AUCTION + action + "/" + name;

  const response = await authFetch(getProfileUrl);
  return await response.json();
}
