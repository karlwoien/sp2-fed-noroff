import { createCountdown } from "./countdown.mjs";

//Creates a single listing card element for the homepage.
function createListingCard(data) {
  // Main div element for each card
  const listingContainer = document.createElement("div");
  listingContainer.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

  // Create anchor tag to wrap the card and make it clickable
  const link = document.createElement("a");
  link.href = `/listing/index.html?id=${data.id || ""}`; // Ensure there is an ID for the listing

  // Card element
  const card = document.createElement("div");
  card.classList.add("card", "listing-card");

  // Image element
  const image = document.createElement("img");
  image.classList.add("card-img-top");
  image.src =
    data.media && data.media.length > 0
      ? data.media[0].url
      : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"; // Fallback image

  image.alt =
    data.media && data.media.length > 0
      ? data.media[0].alt || "Listing image"
      : "No image available";

  // Card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Title element
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = data.title || "Untitled listing"; // Handle missing title

  // Display countdown until listing ends
  const countdown = document.createElement("div");
  createCountdown(data.endsAt, countdown);

  // Append elements to card body and card container
  cardBody.appendChild(title);
  cardBody.appendChild(countdown);
  card.appendChild(image);
  card.appendChild(cardBody);

  // Append the card to the anchor link (making the card clickable)
  link.appendChild(card);

  // Append the link to the listing container
  listingContainer.appendChild(link);

  return listingContainer;
}

//Renders the list of listings on the homepage by appending them to the parent container.
export function renderListings(listingsDataList, parent) {
  parent.innerHTML = "";

  if (!listingsDataList || listingsDataList.length === 0) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "No listings are currently available. Please check back later.";
    errorMessage.classList.add("text-muted", "text-center");
    parent.appendChild(errorMessage);
    return;
  }
  const fragment = document.createDocumentFragment();

  listingsDataList.forEach((listingData) => {
    const listingCard = createListingCard(listingData);
    fragment.appendChild(listingCard);
  });

  parent.appendChild(fragment);
}
