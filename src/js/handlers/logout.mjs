export function setupLogoutListener() {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      //Redirect to home page
      alert("You have now logged out!");
      window.location.href = "/index.html";
    });
  }
}
