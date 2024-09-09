import { getListings } from "../../api/listing/get.mjs";
import { renderListings } from "../../components/listings.mjs";

export async function loadListings() {
  const listings = await getListings();
  const container = document.getElementById("listings");
  container.classList.add("row");

  renderListings(listings, container);
}
