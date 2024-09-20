import { profileInfo } from "../../components/profileInfo.mjs";
import { renderUserListings } from "../../components/userListings.mjs";
import { renderUserBidHistory } from "../../components/userBidHistory.mjs";
import {
  showSpinner,
  hideSpinner,
} from "../../components/loadingIndicator.mjs";

export async function loadProfile() {
  showSpinner();
  const profileContainer = document.querySelector("#profile-info");
  profileContainer.innerHTML = "";

  // Load the profile info
  profileContainer.appendChild(await profileInfo());
  // Load the users listings
  await renderUserListings();
  // Load the users bid history
  await renderUserBidHistory();
  hideSpinner();
}
