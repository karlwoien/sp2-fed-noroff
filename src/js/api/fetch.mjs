import { load } from "../storage/index.mjs";
import { API_KEY } from "./constants.mjs";

// Retrieves the default headers required for authorized requests, including the Bearer token and API key.
export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  };
}

// Makes an authorized fetch
export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
