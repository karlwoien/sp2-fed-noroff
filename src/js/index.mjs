import { router } from "./router.mjs";
import { renderNavItems } from "./components/nav.mjs";
import { setupLogoutListener } from "./handlers/logout.mjs";

document.addEventListener("DOMContentLoaded", () => {
  router();
  renderNavItems();
  setupLogoutListener();
});
