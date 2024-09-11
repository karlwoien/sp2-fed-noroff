//Functionality to template out listings on home page

export function listingsTemplate(data) {
  // Main div element for each card
  const listingContainer = document.createElement("div");
  listingContainer.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

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
      "https://images.unsplash.com/photo-1589287707312-213624549c88?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Fallback image
    image.alt = "No image available";
  }

  // Card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Title element
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = data.title;

  // Countdown element / Listing ends
  const countdown = document.createElement("p");

  // Function to calculate and display the remaining time
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
      clearInterval(intervalId); // Stop the interval once the listing has ended
    }
  }

  // Update the countdown every second
  const intervalId = setInterval(updateCountdown, 1000);

  // Initial countdown update
  updateCountdown();

  // Append elements to card body and card container
  cardBody.appendChild(title);
  cardBody.appendChild(countdown); // Append countdown below the title
  card.appendChild(image);
  card.appendChild(cardBody);
  listingContainer.appendChild(card);

  return listingContainer;
}

export function renderListings(listingsDataList, parent) {
  const listingsHTML = listingsDataList.map(listingsTemplate);
  parent.append(...listingsHTML);
}
