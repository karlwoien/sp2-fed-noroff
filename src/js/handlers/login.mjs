import { login } from "../api/auth/login.mjs";

export function setLoginListener() {
  const form = document.querySelector("#login-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    login(email, password);
  });
}
