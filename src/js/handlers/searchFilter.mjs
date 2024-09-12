import { loadListings } from "../pages/listings/listing.mjs";

// Event listener for search and filter of listings

export function setSearchAndFilterListeners() {
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filter");

  // Prevent the default form submission
  const searchForm = document.querySelector('form[role="search"]');
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // Trigger search when user types in search input
  searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value;
    const selectedFilter = filterSelect.value;

    loadListings(searchQuery, selectedFilter);
  });

  // Trigger filter when user changes the filter option
  filterSelect.addEventListener("change", (e) => {
    const selectedFilter = e.target.value;
    const searchQuery = searchInput.value;

    loadListings(searchQuery, selectedFilter);
  });
}
