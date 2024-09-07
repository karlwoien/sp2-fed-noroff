import { login } from "../api/auth/login.mjs";

export function setLoginListener() {
  const form = document.querySelector("#login-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    login(email, password);
    //Redirect to profile page
    alert("You have now logged in!");
    window.location.href = "/profile/index.html";
  });
}
