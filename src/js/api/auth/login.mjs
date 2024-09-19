import { API_BASE, API_AUTH, API_LOGIN } from "../constants.mjs";
import { save } from "../../storage/index.mjs";

const method = "post";

/**
 * Logs in the user by sending their credentials email and password
 * to the authentication API endpoint. If successful, it stores the access
 * token and profile in local storage.
 *
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {object} profile - The user's profile information.
 * @throws Will throw an error if the login request fails.
 */

export async function login(email, password) {
  const response = await fetch(API_BASE + API_AUTH + API_LOGIN, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    save("token", accessToken);
    save("profile", profile);
    return profile;
  }

  throw new Error(`Login failed: ${response.status} ${response.statusText}`);
}
