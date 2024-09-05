import { setRegisterListener } from "./handlers/register.mjs";
import { setLoginListener } from "./handlers/login.mjs";

export function router() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      break;
    case "/profile/signup/":
    case "/profile/signup/index.html":
      setRegisterListener();
      break;
    case "/profile/login":
    case "/profile/login/index.html":
      setLoginListener();
      break;
  }
}
