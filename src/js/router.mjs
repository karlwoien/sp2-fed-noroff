import { setRegisterListener } from "./handlers/register.mjs";
import { setLoginListener } from "./handlers/login.mjs";
import { loadProfile } from "./pages/user/profile.mjs";
import { loadListings } from "./pages/listings/listing.mjs";
import { setAddListingFormListener } from "./handlers/listing.mjs";

export function router() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      loadListings();
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
  }
}
