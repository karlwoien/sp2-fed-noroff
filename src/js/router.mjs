import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { getAPIKey } from "./api/apikey.mjs";

export function router() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      break;
    case "/profile/signup/":
    case "/profile/signup/index.html":
      setRegisterFormListener();
      break;
    case "/profile/login":
    case "/profile/login/index.html":
      setLoginFormListener();
      getAPIKey();
      break;
  }
}
