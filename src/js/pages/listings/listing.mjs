import { getListings, getListing } from "../../api/listing/get.mjs";
import { renderListings } from "../../components/listings.mjs";
import { renderListing } from "../../components/listing.mjs";

export async function loadListings(query = "", filter = "") {
  const listings = await getListings(query, filter);

  const container = document.getElementById("listings");
  container.innerHTML = "";
  container.classList.add("row");

  renderListings(listings, container);
}

export async function loadListing() {
  const url = new URL(location.href);
  let id = url.searchParams.get("id");

  const listing = await getListing(id);

  renderListing(listing);
}
