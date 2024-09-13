import { profileInfo } from "../../components/profileInfo.mjs";
import { renderUserListings } from "../../components/userListings.mjs";

export async function loadProfile() {
  const profileContainer = document.querySelector("#profile-info");
  profileContainer.innerHTML = "";

  // Load the profile info
  profileContainer.appendChild(await profileInfo());

  // Load the user's listings
  await renderUserListings();
}
