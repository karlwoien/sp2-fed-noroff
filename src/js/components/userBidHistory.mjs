import { getListings } from "../api/listing/get.mjs";
import { getSingleListingWithBids } from "../api/profile/getUserBids.mjs";
import { load } from "../storage/index.mjs";

// Functionality to render users bid history on the users profile page

export async function renderUserBidHistory() {
  const bidHistoryContainer = document.getElementById("user-bid-history");

  bidHistoryContainer.innerHTML = "";

  //Static elements at the top of the bid history section
  const header = document.createElement("p");
  header.textContent = "Your bid history";
  header.classList.add("text-primary", "fs-5", "mt-4");

  const tableHeaderRow = document.createElement("div");
  tableHeaderRow.classList.add("row", "mb-2");

  const titleHeader = document.createElement("div");
  titleHeader.textContent = "Title";
  titleHeader.classList.add("col");

  const amountHeader = document.createElement("div");
  amountHeader.textContent = "Amount";
  amountHeader.classList.add("col");

  const dateHeader = document.createElement("div");
  dateHeader.textContent = "Bid Placed";
  dateHeader.classList.add("col");

  tableHeaderRow.appendChild(titleHeader);
  tableHeaderRow.appendChild(dateHeader);
  tableHeaderRow.appendChild(amountHeader);
  bidHistoryContainer.appendChild(header);
  bidHistoryContainer.appendChild(tableHeaderRow);

  try {
    const profile = load("profile");
    const loggedInUser = profile ? profile.name : null;

    if (!loggedInUser) {
      bidHistoryContainer.innerHTML = `<p class="text-danger"> Failed to load user data. Please log in again.</p>`;
      return;
    }

    // Fetch all listings
    const listings = await getListings();

    // Parallelize fetching of bid data using Promise.all
    const listingPromises = listings.map((listing) =>
      getSingleListingWithBids(listing.id),
    );

    const listingsWithBids = await Promise.all(listingPromises);

    // Filter and render bid history, filter bids to show only those placed by the logged-in user
    listingsWithBids.forEach((listingWithBids) => {
      const userBids = listingWithBids.bids.filter(
        (bid) => bid.bidder.name === loggedInUser,
      );

      if (userBids.length === 0) return;

      // Dynamically render the filtered bids for this listing
      userBids.forEach((bid) => {
        const bidRow = document.createElement("div");
        bidRow.classList.add("row", "mb-3", "p-2", "border", "rounded");
        bidRow.style.cursor = "pointer";

        // Title
        const title = document.createElement("div");
        title.textContent = listingWithBids.title;
        title.classList.add("col");

        // Amount
        const amount = document.createElement("div");
        amount.textContent = `$${bid.amount}`;
        amount.classList.add("col");

        // Bid Placed
        const bidPlaced = document.createElement("div");
        const bidDate = new Date(bid.created);
        bidPlaced.textContent = bidDate.toLocaleDateString();
        bidPlaced.classList.add("col");

        // Add click handler to go to specific listing
        bidRow.addEventListener("click", () => {
          window.location.href = `/listing/index.html?id=${listingWithBids.id}`;
        });

        bidRow.appendChild(title);
        bidRow.appendChild(bidPlaced);
        bidRow.appendChild(amount);

        bidHistoryContainer.appendChild(bidRow);
      });
    });

    if (bidHistoryContainer.children.length <= 2) {
      const noBidsMessage = document.createElement("p");
      noBidsMessage.textContent = "You have not placed any bids.";
      bidHistoryContainer.appendChild(noBidsMessage);
    }
  } catch (error) {
    console.error("Error fetching user bid history:", error);
    bidHistoryContainer.innerHTML += `<p class="text-danger">Failed to load your bid history. Please try again later.</p>`;
  }
}
