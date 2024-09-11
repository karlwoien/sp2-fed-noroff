//Functionality to template out single listing

export function listingTemplate(data) {
  const listingElements = {};

  // Media section (image)
  const mediaContainer = document.createElement("div");

  const image = document.createElement("img");
  if (data.media && data.media.length > 0) {
    image.src = data.media[0].url;
    image.alt = data.media[0].alt || "Listing image";
  } else {
    image.src =
      "https://images.unsplash.com/photo-1589287707312-213624549c88?q=80&w=1074&auto=format&fit=crop";
    image.alt = "No image available";
  }

  image.style.objectFit = "cover";
  image.style.width = "100%";
  image.style.height = "100%";

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

  const countdown = document.createElement("p");
  infoContainer.appendChild(countdown);

  function updateCountdown() {
    const now = new Date();
    const endsAt = new Date(data.endsAt);
    const timeDifference = endsAt - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdown.textContent = `Listing ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdown.textContent = "Listing has ended";
      countdown.classList.add("text-danger");
      clearInterval(intervalId);
    }
  }

  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();

  const description = document.createElement("h5");
  description.textContent = "Description";
  description.classList.add("text-primary");
  infoContainer.appendChild(description);

  const descriptionText = document.createElement("p");
  descriptionText.textContent = data.description;
  infoContainer.appendChild(descriptionText);

  listingElements.infoContainer = infoContainer;

  // Bid history section
  const bidHistoryContainer = document.createElement("div");

  const bidHistoryTitle = document.createElement("h5");
  bidHistoryTitle.textContent = "Bid history";
  bidHistoryTitle.classList.add("text-primary");
  bidHistoryContainer.appendChild(bidHistoryTitle);

  // Row for titles (Bidder's name, Bid placed, Amount)
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

  // Reverse the bids array to show the latest bids first
  const bids = [...data.bids].reverse();

  // Display each bid in a row
  bids.forEach((bid) => {
    const bidRow = document.createElement("div");
    bidRow.classList.add("row", "mb-3");

    // Bidder's name
    const bidderName = document.createElement("div");
    bidderName.classList.add("col-4");
    bidderName.textContent = bid.bidder.name;

    // Bid placed (format the date)
    const bidDate = document.createElement("div");
    bidDate.classList.add("col-4");
    const bidPlacedDate = new Date(bid.created);
    bidDate.textContent = bidPlacedDate.toLocaleDateString("en-GB");

    // Amount
    const bidAmount = document.createElement("div");
    bidAmount.classList.add("col-4");
    bidAmount.textContent = `$${bid.amount}`;

    // Append to the bid row
    bidRow.appendChild(bidderName);
    bidRow.appendChild(bidDate);
    bidRow.appendChild(bidAmount);

    // Append bid row to the bid history container
    bidHistoryContainer.appendChild(bidRow);
  });

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
