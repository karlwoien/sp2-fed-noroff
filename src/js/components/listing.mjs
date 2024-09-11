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

  const highestBid = document.createElement("p");
  highestBid.textContent = `Highest bid: $${data._count.bids}`;
  infoContainer.appendChild(highestBid);

  const seller = document.createElement("p");
  seller.textContent = `Seller: ${data.seller ? data.seller.name : "Unknown"}`;
  infoContainer.appendChild(seller);

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
  const bidHistory = document.createElement("h5");
  bidHistory.textContent = "Bid history";
  bidHistory.classList.add("text-primary");
  listingElements.bidHistory = bidHistory;

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
