import { load } from "../../storage/index.mjs";

// Check if the user is logged in by verifying the presence of a token in storage
export function isLoggedIn() {
  const token = load("token");
  return token !== null;
}
