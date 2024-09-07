import { load } from "../../storage/index.mjs";

// Check if the user is logged in
export function isLoggedIn() {
  const token = load("token");
  return token != null;
}
