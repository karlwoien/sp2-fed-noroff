// Function to template bid history with data from API

export function createBidHistory(bids, container) {
  // Sort bids latest bids first
  const sortedBids = [...bids].reverse();

  sortedBids.forEach((bid) => {
    const bidRow = document.createElement("div");
    bidRow.classList.add("row", "mb-3");

    const bidderName = document.createElement("div");
    bidderName.classList.add("col-4");
    bidderName.textContent = bid.bidder.name;

    const bidDate = document.createElement("div");
    bidDate.classList.add("col-4");
    const bidPlacedDate = new Date(bid.created);
    bidDate.textContent = bidPlacedDate.toLocaleDateString();

    const bidAmount = document.createElement("div");
    bidAmount.classList.add("col-4");
    bidAmount.textContent = `$${bid.amount}`;

    bidRow.appendChild(bidderName);
    bidRow.appendChild(bidDate);
    bidRow.appendChild(bidAmount);

    container.appendChild(bidRow);
  });
}
