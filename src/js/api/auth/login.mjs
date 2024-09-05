import { API_BASE } from "../constants.mjs";
import { API_AUTH } from "../constants.mjs";
import { API_LOGIN } from "../constants.mjs";
import { save } from "../../storage/index.mjs";

const method = "post";

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

  throw new Error("Could not login account");
}
