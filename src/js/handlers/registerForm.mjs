import { register } from "../api/auth/register.mjs";

export function setRegisterListener() {
  const form = document.querySelector("#register-form");

  // Custom Bootstrap validation
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    form.classList.remove("was-validated");

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await register(name, email, password);
      alert("Registration successful!");
      window.location.href = "/profile/login/index.html";
    } catch {
      displayError("Registration failed. Please try again.");
    }
  });

  function displayError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger", "mt-3");
    errorDiv.innerText = message;
    form.appendChild(errorDiv);
  }
}
