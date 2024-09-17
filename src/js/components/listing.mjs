import { createCountdown } from "./countdown.mjs";
import { createBidForm } from "./bidform.mjs";
import { createBidHistory } from "./bidHistory.mjs";

//Functionality to template out single listing
export function listingTemplate(data) {
  const listingElements = {};

  // Media section (image)
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-container");

  const image = document.createElement("img");
  if (data.media && data.media.length > 0) {
    image.src = data.media[0].url;
    image.alt = data.media[0].alt || "Listing image";
  } else {
    image.src =
      "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
    image.alt = "No image available";
  }

  mediaContainer.appendChild(image);
  listingElements.image = mediaContainer;

  // Info section (title, description, highest bid, seller info)
  const infoContainer = document.createElement("div");

  const title = document.createElement("h5");
  title.textContent = data.title;
  title.classList.add("text-primary");
  infoContainer.appendChild(title);

  const seller = document.createElement("p");
  seller.textContent = `Listed by: ${data.seller ? data.seller.name : "Unknown"}`;
  infoContainer.appendChild(seller);

  // Find the highest bid from the bids array
  const highestBidAmount =
    data.bids.length > 0 ? Math.max(...data.bids.map((bid) => bid.amount)) : 0;

  // Display the highest bid
  const highestBid = document.createElement("p");
  highestBid.textContent = `Highest bid: $${highestBidAmount}`;
  infoContainer.appendChild(highestBid);

  // Display countdown until listing ends
  createCountdown(data.endsAt, infoContainer);

  // Display bid form
  createBidForm(highestBidAmount, data.id, infoContainer);

  const description = document.createElement("h5");
  description.textContent = "Description";
  description.classList.add("text-primary");
  infoContainer.appendChild(description);

  const descriptionText = document.createElement("p");
  descriptionText.textContent = data.description;
  infoContainer.appendChild(descriptionText);

  listingElements.infoContainer = infoContainer;

  // Display bid history on listing
  const bidHistoryContainer = document.createElement("div");

  // Display headers
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

  // Check if there are any bids and display message if there are none
  if (data.bids.length === 0) {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.textContent = "No bids made on the listing yet.";
    noBidsMessage.classList.add("text-muted");
    bidHistoryContainer.appendChild(noBidsMessage);
  } else {
    // If there are bids, call createBidHistory function
    createBidHistory(data.bids, bidHistoryContainer);
  }

  listingElements.bidHistory = bidHistoryContainer;

  return listingElements;
}

export function renderListing(data) {
  if (!data) {
    console.error("No listing data available to render.");
    return;
  }

  const listingElements = listingTemplate(data);

  // Append the image to the media container
  const mediaContainer = document.getElementById("listing-media");
  if (mediaContainer) {
    mediaContainer.appendChild(listingElements.image);
  } else {
    console.error("Media container not found");
  }

  // Append listing info (title, description, etc.) to the info container
  const infoContainer = document.getElementById("listing-info");
  if (infoContainer) {
    infoContainer.appendChild(listingElements.infoContainer);
  } else {
    console.error("Info container not found");
  }

  // Append bid history to the bid history container
  const bidHistoryContainer = document.getElementById("bid-history");
  if (bidHistoryContainer) {
    bidHistoryContainer.appendChild(listingElements.bidHistory);
  } else {
    console.error("Bid history container not found");
  }
}
