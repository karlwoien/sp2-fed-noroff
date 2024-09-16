// Function to template bid history with data from API

export function createBidHistory(bids, container) {
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

    bidHistoryContainer.appendChild(bidRow);
  });

  container.appendChild(bidHistoryContainer);
}
