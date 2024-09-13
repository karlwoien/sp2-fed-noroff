// userListings.mjs

import { getUserListings } from "../api/profile/getUserListings.mjs";

export async function renderUserListings() {
  const listingsContainer = document.getElementById("user-listings");

  if (!listingsContainer) {
    console.error("User listings container not found");
    return;
  }

  // Clear the container first
  listingsContainer.innerHTML = "";

  // Static elements that should appear at the top of the listings section
  const header = document.createElement("p");
  header.textContent = "Your listings";
  header.classList.add("text-primary", "fs-5", "mt-4");

  const tableHeaderRow = document.createElement("div");
  tableHeaderRow.classList.add("row", "fs-5");

  const titleHeader = document.createElement("div");
  titleHeader.textContent = "Title";
  titleHeader.classList.add("col"); // Use col class for consistent grid

  const descriptionHeader = document.createElement("div");
  descriptionHeader.textContent = "Description";
  descriptionHeader.classList.add("col");

  const statusHeader = document.createElement("div");
  statusHeader.textContent = "Status";
  statusHeader.classList.add("col");

  // Append the static header elements to the container
  tableHeaderRow.appendChild(titleHeader);
  tableHeaderRow.appendChild(descriptionHeader);
  tableHeaderRow.appendChild(statusHeader);
  listingsContainer.appendChild(header);
  listingsContainer.appendChild(tableHeaderRow);

  try {
    const listings = await getUserListings();

    if (listings.length === 0) {
      // If no listings, add a message below the static elements
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "No listings found.";
      listingsContainer.appendChild(noListingsMessage);
      return;
    }

    // Dynamically render the listings
    listings.forEach((listing) => {
      const listingRow = document.createElement("div");
      listingRow.classList.add("row", "mb-3", "p-2", "border", "rounded"); // Make sure it's using Bootstrap row
      listingRow.style.cursor = "pointer";

      // Title
      const title = document.createElement("div");
      title.textContent = listing.title;
      title.classList.add("col"); // Ensure it aligns with the title header

      // Description
      const description = document.createElement("div");
      description.textContent = listing.description;
      description.classList.add("col"); // Ensure it aligns with the description header

      // Status (active or inactive based on end date)
      const status = document.createElement("div");
      const isActive = new Date(listing.endsAt) > new Date();
      status.textContent = isActive ? "Active" : "Inactive";
      status.classList.add(isActive ? "text-success" : "text-danger", "col"); // Ensure it aligns with the status header

      // Add click handler to go to listing page
      listingRow.addEventListener("click", () => {
        window.location.href = `/listing/index.html?id=${listing.id}`;
      });

      // Append the elements to the row
      listingRow.appendChild(title);
      listingRow.appendChild(description);
      listingRow.appendChild(status);

      // Append the row to the container
      listingsContainer.appendChild(listingRow);
    });
  } catch (error) {
    console.error("Error fetching user listings:", error);
    listingsContainer.innerHTML += `<p class="text-danger">Failed to load your listings. Please try again later.</p>`;
  }
}
