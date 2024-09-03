import { setRegisterFormListener } from "./handlers/register.mjs";

export function router() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      break;
    case "/profile/signup/":
    case "/profile/signup/index.html":
      setRegisterFormListener();
      break;
  }
}
