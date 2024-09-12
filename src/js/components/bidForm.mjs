import { authFetch } from "../api/fetch.mjs";
import { API_BASE, API_AUCTION } from "../api/constants.mjs";

// Creates the bid form and handles bid submission when on a single listing
export function createBidForm(highestBidAmount, listingId, container) {
  const bidContainer = document.createElement("div");
  bidContainer.classList.add("d-flex", "align-items-center", "mb-3");

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.min = highestBidAmount + 1;
  bidInput.placeholder = `Your bid (min: $${highestBidAmount + 1})`;
  bidInput.classList.add("form-control", "me-2");

  const bidButton = document.createElement("button");
  bidButton.textContent = "Place bid";
  bidButton.classList.add("btn", "btn-primary");

  bidContainer.appendChild(bidInput);
  bidContainer.appendChild(bidButton);
  container.appendChild(bidContainer);

  // Handle bid submission
  bidButton.addEventListener("click", async () => {
    const bidAmount = parseFloat(bidInput.value);

    if (isNaN(bidAmount) || bidAmount <= highestBidAmount) {
      alert(`Please enter a valid amount greater than $${highestBidAmount}.`);
      return;
    }

    try {
      const bidUrl = `${API_BASE}${API_AUCTION}/listings/${listingId}/bids`;

      const response = await authFetch(bidUrl, {
        method: "POST",
        body: JSON.stringify({ amount: bidAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to place bid.");
      }

      await response.json();
      alert("Bid placed successfully!");
      location.reload();
    } catch (error) {
      console.error(error);
      alert("An error occurred while placing the bid.");
    }
  });
}
