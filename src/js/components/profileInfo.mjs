import { getProfile } from "../api/profile/get.mjs";

// Extract the name parameter from the URL query string
const profileName = new URLSearchParams(window.location.search).get("name");

export async function profileInfo() {
  const user = await getProfile(profileName);

  const textContainer = document.createElement("div");

  const userName = document.createElement("p");
  userName.textContent = user.data.name;
  userName.classList.add("text-primary");

  const avatar = document.createElement("img");
  avatar.classList.add("rounded-circle", "profile-image");
  avatar.src = user.data.avatar.url;
  avatar.alt = user.data.name + "profile avatar";

  // Button to change avatar

  //Overview

  //Credits

  const credit = document.createElement("p");
  credit.textContent = user.data.credits;

  //Listings
  //antall

  //Wins
  //antall

  textContainer.appendChild(userName);
  textContainer.appendChild(avatar);
  textContainer.appendChild(credit);

  return textContainer;
}
