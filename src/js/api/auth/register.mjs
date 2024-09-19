import { API_BASE, API_AUTH, API_REGISTER } from "../constants.mjs";

const method = "post";

/**
 * Registers a new user by sending their name, email, and password to the registration API endpoint.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {object} responseData - The data returned by the API if registration is successful.
 * @throws Will throw an error if the registration request fails.
 */

export async function register(name, email, password) {
  const response = await fetch(API_BASE + API_AUTH + API_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(
    `Registration failed: ${response.status} ${response.statusText}`,
  );
}
