import { createCountdown } from "./countdown.mjs";

//Functionality to template out listings on home page

export function listingsTemplate(data) {
  // Main div element for each card
  const listingContainer = document.createElement("div");
  listingContainer.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

  // Create anchor tag to wrap the card and make it clickable
  const link = document.createElement("a");
  link.href = `/listing/index.html?id=${data.id}`; // Redirect to single listing page with the listing ID

  // Card element
  const card = document.createElement("div");
  card.classList.add("card", "listing-card");

  // Image element
  const image = document.createElement("img");
  image.classList.add("card-img-top");
  if (data.media && data.media.length > 0) {
    image.src = data.media[0].url;
    image.alt = data.media[0].alt || "Listing image";
  } else {
    image.src =
      "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"; // Fallback image
    image.alt = "No image available";
  }

  // Card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Title element
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = data.title;

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

export function renderListings(listingsDataList, parent) {
  const listingsHTML = listingsDataList.map(listingsTemplate);
  parent.append(...listingsHTML);
}
