import { getListings, getListing } from "../../api/listing/get.mjs";
import { renderListings } from "../../components/listings.mjs";
import { renderListing } from "../../components/listing.mjs";
import {
  showSpinner,
  hideSpinner,
} from "../../components/loadingIndicator.mjs";

export async function loadListings(query = "", filter = "") {
  showSpinner();
  const listings = await getListings(query, filter);

  const container = document.getElementById("listings");
  container.innerHTML = "";
  container.classList.add("row");

  renderListings(listings, container);
  hideSpinner();
}

export async function loadListing() {
  showSpinner();

  const url = new URL(location.href);
  let id = url.searchParams.get("id");

  const listing = await getListing(id);

  renderListing(listing);
  hideSpinner();
}
