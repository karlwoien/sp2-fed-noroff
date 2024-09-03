import { API_BASE } from "../constants.mjs";
import { API_AUTH } from "../constants.mjs";
import { API_REGISTER } from "../constants.mjs";

const method = "post";

export async function register(profile) {
  const registerUrl = API_BASE + API_AUTH + API_REGISTER;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const result = await response.json();

  return result;
}
