import { addListing } from "../api/listing/createListing.mjs";

export function setAddListingFormListener() {
  const form = document.querySelector("#add-listing");
  const formMessage = document.querySelector("#form-message");

  // Custom Bootstrap validation
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Check form validity
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    form.classList.remove("was-validated");

    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());

    // Handle media if image URL is provided
    if (post.image) {
      const media = [
        {
          url: post.image,
          alt: post.title || "Image of product",
        },
      ];
      post.media = media;
    }

    post.endsAt = new Date(post.endsAt).toISOString();

    try {
      // API call to add the listing
      await addListing(post);
      displayMessage("Listing successfully published!", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch {
      displayMessage("Error creating listing. Please try again.", "danger");
    }
  });

  function displayMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove("d-none", "alert-success", "alert-danger");
    formMessage.classList.add(`alert-${type}`);
  }
}
