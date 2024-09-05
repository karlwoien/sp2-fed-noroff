import { profileInfo } from "../../components/profileInfo.mjs";

export async function loadProfile() {
  const profileContainer = document.querySelector("#profile-info");
  profileContainer.innerHTML = "";

  profileContainer.appendChild(await profileInfo());
}
