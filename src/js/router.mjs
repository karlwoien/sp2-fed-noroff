import { setRegisterListener } from "./handlers/registerForm.mjs";
import { setLoginListener } from "./handlers/loginForm.mjs";
import { loadProfile } from "./pages/user/profile.mjs";
import { loadListings, loadListing } from "./pages/listings/listing.mjs";
import { setAddListingFormListener } from "./handlers/addListingForm.mjs";
import { setSearchAndFilterListeners } from "./handlers/searchFilter.mjs";
import { isLoggedIn } from "./api/auth/auth.mjs";

export function router() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      loadListings("", "latest");
      setSearchAndFilterListeners();
      if (isLoggedIn()) {
        const heroSection = document.getElementById("hero-section");
        if (heroSection) {
          heroSection.style.display = "none";
        }
      }
      break;
    case "/profile/signup/":
    case "/profile/signup/index.html":
      setRegisterListener();
      break;
    case "/profile/login":
    case "/profile/login/index.html":
      setLoginListener();
      break;
    case "/profile":
    case "/profile/index.html":
      loadProfile();
      break;
    case "/listing/add-new":
    case "/listing/add-new/index.html":
      setAddListingFormListener();
      break;
    case "/listing":
    case "/listing/index.html":
      loadListing();
      break;
  }
}
