import { API_BASE } from "../constants.mjs";
import { API_AUTH } from "../constants.mjs";
import { API_LOGIN } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const method = "post";

export async function login(profile) {
  const loginUrl = API_BASE + API_AUTH + API_LOGIN;
  const body = JSON.stringify(profile);

  const response = await fetch(loginUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const result = await response.json();

  storage.save("token", result.accessToken);

  storage.save("profile", result);

  alert("You are now logged in!");
}
