import { API_BASE } from "../constants.mjs";
import { API_AUTH } from "../constants.mjs";
import { API_REGISTER } from "../constants.mjs";

const method = "post";

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

  throw new Error("Could not register account");
}
