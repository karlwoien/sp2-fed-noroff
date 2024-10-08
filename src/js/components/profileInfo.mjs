import { getProfile } from "../api/profile/get.mjs";
import { changeAvatarModal } from "../handlers/changeAvatar.mjs";

// Extract the name parameter from the URL query string
const profileName = new URLSearchParams(window.location.search).get("name");

//Fetches and displays the user's profile info, including username, avatar, and an overview of credits, listings, and wins.
export async function profileInfo() {
  const user = await getProfile(profileName);

  const profileInfoContainer = document.createElement("div");

  // Section for username and avatar
  const userAvatarContainer = document.createElement("div");
  userAvatarContainer.classList.add("text-center");

  const userName = document.createElement("p");
  userName.textContent = user.data.name;
  userName.classList.add("text-primary", "mt-4", "fs-5");

  const avatar = document.createElement("img");
  avatar.classList.add("rounded-circle", "profile-image", "mt-2");
  avatar.src = user.data.avatar.url;
  avatar.alt = user.data.name + "profile avatar";

  // Load the Change Avatar Button with Modal
  const changeAvatarButton = await changeAvatarModal();

  //Section for overview of credits, listings, wins
  const overviewContainer = document.createElement("div");
  overviewContainer.classList.add("mt-5");

  const overviewHeader = document.createElement("p");
  overviewHeader.textContent = "Overview";
  overviewHeader.classList.add("text-primary", "fs-5");

  // Create a div container for credits, listings, wins
  const createOverviewItem = (label, value) => {
    const container = document.createElement("div");
    container.classList.add("d-flex", "justify-content-between");

    const labelText = document.createElement("p");
    labelText.textContent = label;

    const valueText = document.createElement("p");
    valueText.textContent = value;

    container.appendChild(labelText);
    container.appendChild(valueText);

    return container;
  };

  // Credits
  const creditContainer = createOverviewItem(
    "Your credit:",
    "$" + user.data.credits,
  );

  // Listings
  const listingsContainer = createOverviewItem(
    "Listings:",
    user.data._count.listings,
  );

  // Wins
  const winsContainer = createOverviewItem("Wins:", user.data._count.wins);

  userAvatarContainer.appendChild(userName);
  userAvatarContainer.appendChild(avatar);
  userAvatarContainer.appendChild(changeAvatarButton);

  overviewContainer.appendChild(overviewHeader);
  overviewContainer.appendChild(creditContainer);
  overviewContainer.appendChild(listingsContainer);
  overviewContainer.appendChild(winsContainer);

  profileInfoContainer.appendChild(userAvatarContainer);
  profileInfoContainer.appendChild(overviewContainer);

  return profileInfoContainer;
}
