import { register } from "../api/auth/register.mjs";

export function setRegisterListener() {
  const form = document.querySelector("#register-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    register(name, email, password);
  });
}
