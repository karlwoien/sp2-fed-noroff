import { login } from "../api/auth/login.mjs";

// Sets up the login form listener to handle form submission and user login.
export function setLoginListener() {
  const form = document.querySelector("#login-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.classList.remove("was-validated");

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await login(email, password);
      alert("Login successful!");
      window.location.href = "/profile/index.html";
    } catch {
      displayError("Login failed. Please check your email or password.");
    }
  });

  function displayError(message) {
    const errorMessageDiv = document.querySelector("#error-message");
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove("d-none");
  }
}
