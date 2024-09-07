import { isLoggedIn } from "../api/auth/auth.mjs";

// Function to render nav items based on if the user is logged in or not

export function renderNavItems() {
  const navItems = document.getElementById("nav-items");
  navItems.classList.add("flex-end");
  navItems.innerHTML = "";

  if (isLoggedIn()) {
    navItems.innerHTML = `
     <li class="nav-item">
        <a class="nav-link" href="/index.html">Home</a>
      </li>
       <li class="nav-item">
        <a class="nav-link" href="/listing/add-new/index.html">Add listing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile/index.html">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="logout">Logout</a>
      </li>
    `;
  } else {
    navItems.innerHTML = `
     <li class="nav-item">
        <a class="nav-link" href="/index.html">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile/login/index.html">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile/signup/index.html">Signup</a>
      </li>
    `;
  }
}
