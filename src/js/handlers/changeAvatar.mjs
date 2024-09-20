// Function to handle update/change of users avatar

import { authFetch } from "../api/fetch.mjs";
import { load } from "../storage/index.mjs";
import { API_BASE, API_AUCTION } from "../api/constants.mjs";

const action = "/profiles";

// Function to validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// Function to generate and handle the modal
export async function changeAvatarModal() {
  // Get the current profile from local storage
  const { name } = load("profile");

  // Ensure a valid profile name is available
  if (!name) {
    throw new Error("No profile loaded");
  }

  // Create the button to open the modal
  const changeAvatarButton = document.createElement("button");
  changeAvatarButton.textContent = "Change Avatar";
  changeAvatarButton.classList.add("btn", "btn-primary", "mt-4");
  changeAvatarButton.setAttribute("data-bs-toggle", "modal");
  changeAvatarButton.setAttribute("data-bs-target", "#changeAvatarModal");

  // Create the modal container
  const modalHtml = `
    <div class="modal fade" id="changeAvatarModal" tabindex="-1" aria-label="changeAvatarLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="changeAvatarLabel">Change Avatar</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="changeAvatarForm">
              <div class="mb-3">
                <label for="avatarUrl" class="form-label">Enter the new avatar URL</label>
                <input type="url" class="form-control" id="avatarUrl" placeholder="https://example.com/avatar.jpg">
                <div class="form-text">Make sure the URL is publicly accessible.</div>
              </div>
              <div class="alert alert-danger d-none" id="avatarError">Please provide a valid URL.</div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="updateAvatarButton">Update Avatar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert the modal HTML into the body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Add event listener for the update button in the modal
  document
    .getElementById("updateAvatarButton")
    .addEventListener("click", async () => {
      const avatarUrl = document.getElementById("avatarUrl").value.trim();
      const errorAlert = document.getElementById("avatarError");

      // Validate URL
      if (!avatarUrl || !isValidUrl(avatarUrl)) {
        errorAlert.classList.remove("d-none");
        return;
      }
      errorAlert.classList.add("d-none"); // Hide error message

      // Prepare API request body
      const requestBody = {
        avatar: {
          url: avatarUrl,
          alt: `${name}'s avatar`,
        },
      };

      // Send the request to update the avatar
      try {
        const updateProfileUrl = `${API_BASE}${API_AUCTION}${action}/${name}`;
        const response = await authFetch(updateProfileUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to update avatar. Status: ${response.status}`,
          );
        }

        // Success: close the modal and provide feedback
        const modalElement = document.getElementById("changeAvatarModal");
        const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
        bootstrapModal.hide();

        alert("Avatar updated successfully!");
        location.reload();
      } catch (error) {
        console.error("Error updating avatar:", error);
        errorAlert.textContent = "Failed to update avatar. Please try again.";
        errorAlert.classList.remove("d-none");
      }
    });

  return changeAvatarButton;
}
