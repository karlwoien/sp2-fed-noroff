import { createCountdown } from "./countdown.mjs";
import { createBidForm } from "./bidform.mjs";
import { createBidHistory } from "./bidHistory.mjs";
import { isLoggedIn } from "../api/auth/auth.mjs";

//Creates and returns the media section for the listing.
function createMediaSection(media) {
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-container");

  const image = document.createElement("img");
  if (media && media.length > 0) {
    image.src = media[0].url;
    image.alt = media[0].alt || "Listing image";
  } else {
    image.src =
      "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
    image.alt = "No image available";
  }

  mediaContainer.appendChild(image);
  return mediaContainer;
}

// Creates the info section including title, seller info, highest bid, and description.
function createInfoSection(data, highestBidAmount) {
  const { title, seller, description, endsAt, id } = data;
  const infoContainer = document.createElement("div");

  // Title
  const titleElement = document.createElement("h5");
  titleElement.textContent = title;
  titleElement.classList.add("text-primary");
  infoContainer.appendChild(titleElement);

  // Seller info
  const sellerElement = document.createElement("p");
  sellerElement.textContent = `Listed by: ${seller ? seller.name : "Unknown"}`;
  infoContainer.appendChild(sellerElement);

  // Highest bid
  const highestBid = document.createElement("p");
  highestBid.textContent = `Highest bid: $${highestBidAmount}`;
  infoContainer.appendChild(highestBid);

  // Countdown
  createCountdown(endsAt, infoContainer);

  // Bid form or login message
  if (isLoggedIn()) {
    createBidForm(highestBidAmount, id, infoContainer);
  } else {
    const loginMessage = document.createElement("p");
    loginMessage.innerHTML = "You must be logged in to place a bid.";
    loginMessage.classList.add("text-danger");
    infoContainer.appendChild(loginMessage);
  }

  // Description
  const descriptionTitle = document.createElement("h5");
  descriptionTitle.textContent = "Description";
  descriptionTitle.classList.add("text-primary");
  infoContainer.appendChild(descriptionTitle);

  const descriptionText = document.createElement("p");
  descriptionText.textContent = description;
  infoContainer.appendChild(descriptionText);

  return infoContainer;
}

//Creates the bid history section for the listing.
function createBidHistorySection(bids) {
  const bidHistoryContainer = document.createElement("div");

  const bidHistoryTitle = document.createElement("h5");
  bidHistoryTitle.textContent = "Bid history";
  bidHistoryTitle.classList.add("text-primary");
  bidHistoryContainer.appendChild(bidHistoryTitle);

  const bidTitlesRow = document.createElement("div");
  bidTitlesRow.classList.add("row", "font-weight-bold", "mb-2");

  const nameTitle = document.createElement("div");
  nameTitle.classList.add("col-4");
  nameTitle.textContent = "Bidder's name";

  const dateTitle = document.createElement("div");
  dateTitle.classList.add("col-4");
  dateTitle.textContent = "Bid placed";

  const amountTitle = document.createElement("div");
  amountTitle.classList.add("col-4");
  amountTitle.textContent = "Amount";

  bidTitlesRow.appendChild(nameTitle);
  bidTitlesRow.appendChild(dateTitle);
  bidTitlesRow.appendChild(amountTitle);
  bidHistoryContainer.appendChild(bidTitlesRow);

  if (bids.length === 0) {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.textContent = "No bids made on the listing yet.";
    noBidsMessage.classList.add("text-muted");
    bidHistoryContainer.appendChild(noBidsMessage);
  } else {
    createBidHistory(bids, bidHistoryContainer);
  }

  return bidHistoryContainer;
}

// Generates the complete template for a single listing.
export function listingTemplate(data) {
  const { bids } = data;

  const highestBidAmount =
    bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

  return {
    image: createMediaSection(data.media),
    infoContainer: createInfoSection(data, highestBidAmount),
    bidHistory: createBidHistorySection(bids),
  };
}

//Renders the listing onto the page by appending the appropriate elements to the DOM.
export function renderListing(data) {
  if (!data) {
    console.error("No listing data available to render.");
    return;
  }

  const listingElements = listingTemplate(data);

  // Media
  const mediaContainer = document.getElementById("listing-media");
  if (mediaContainer) {
    mediaContainer.appendChild(listingElements.image);
  }

  // Info
  const infoContainer = document.getElementById("listing-info");
  if (infoContainer) {
    infoContainer.appendChild(listingElements.infoContainer);
  }

  // Bid history
  const bidHistoryContainer = document.getElementById("bid-history");
  if (bidHistoryContainer) {
    bidHistoryContainer.appendChild(listingElements.bidHistory);
  }
}
