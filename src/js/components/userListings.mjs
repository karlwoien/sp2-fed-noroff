import { getUserListings } from "../api/profile/getUserListings.mjs";

//Functionality to render listings added by the user

export async function renderUserListings() {
  const listingsContainer = document.getElementById("user-listings");

  if (!listingsContainer) {
    console.error("User listings container not found");
    return;
  }

  listingsContainer.innerHTML = "";

  // Static elements that should appear at the top of the listings section
  const header = document.createElement("p");
  header.textContent = "Your listings";
  header.classList.add("text-primary", "fs-5", "mt-4");

  const tableHeaderRow = document.createElement("div");
  tableHeaderRow.classList.add("row", "fs-5");

  const titleHeader = document.createElement("div");
  titleHeader.textContent = "Title";
  titleHeader.classList.add("col");

  const descriptionHeader = document.createElement("div");
  descriptionHeader.textContent = "Created";
  descriptionHeader.classList.add("col");

  const statusHeader = document.createElement("div");
  statusHeader.textContent = "Status";
  statusHeader.classList.add("col");

  tableHeaderRow.appendChild(titleHeader);
  tableHeaderRow.appendChild(descriptionHeader);
  tableHeaderRow.appendChild(statusHeader);
  listingsContainer.appendChild(header);
  listingsContainer.appendChild(tableHeaderRow);

  try {
    const listings = await getUserListings();

    if (listings.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "You have not added any listings yet.";
      listingsContainer.appendChild(noListingsMessage);
      return;
    }

    // Dynamically render the listings
    listings.forEach((listing) => {
      const listingRow = document.createElement("div");
      listingRow.classList.add("row", "mb-3", "p-2", "border", "rounded");
      listingRow.style.cursor = "pointer";

      // Title
      const title = document.createElement("div");
      title.textContent = listing.title;
      title.classList.add("col");

      // Date when listing were created
      const createdDate = document.createElement("div");
      const dateCreated = new Date(listing.created);
      createdDate.textContent = dateCreated.toLocaleDateString();
      createdDate.classList.add("col");

      // Status (active or inactive based on end date)
      const status = document.createElement("div");
      const isActive = new Date(listing.endsAt) > new Date();
      status.textContent = isActive ? "Active" : "Inactive";
      status.classList.add(isActive ? "text-success" : "text-danger", "col");

      // Add click handler to go to listing page
      listingRow.addEventListener("click", () => {
        window.location.href = `/listing/index.html?id=${listing.id}`;
      });

      listingRow.appendChild(title);
      listingRow.appendChild(createdDate);
      listingRow.appendChild(status);

      listingsContainer.appendChild(listingRow);
    });
  } catch (error) {
    console.error("Error fetching user listings:", error);
    listingsContainer.innerHTML += `<p class="text-danger">Failed to load your listings. Please try again later.</p>`;
  }
}
