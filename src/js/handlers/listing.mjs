import { addListing } from "../api/listing/createListing.mjs";

export function setAddListingFormListener() {
  const form = document.querySelector("#add-listing");
  const formMessage = document.querySelector("#form-message");

  // Real-time validation for form fields
  addRealTimeValidation("#title");
  addRealTimeValidation("#deadline");

  // Form submission logic
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Check if the form is valid using HTML5 validation
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Gather form data
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());

    const media = [
      {
        url: post.image,
        alt: post.title || "Image of product",
      },
    ];
    post.media = media;

    post.endsAt = new Date(post.endsAt).toISOString();

    try {
      // API call to add the listing
      await addListing(post);
      formMessage.textContent = "Listing successfully published!";
      formMessage.classList.remove("d-none");
      formMessage.classList.add("alert-success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch {
      formMessage.textContent = "Error creating listing. Please try again.";
      formMessage.classList.remove("d-none");
      formMessage.classList.add("alert-danger");
    }
  });

  // Real-time validation function for fields
  function addRealTimeValidation(selector) {
    const field = document.querySelector(selector);

    // Validate field on input and blur events
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  }

  // Validate individual field with HTML5 validation and custom messages
  function validateField(field) {
    field.setCustomValidity("");

    // Check if the field is valid or invalid using HTML5 validity
    if (!field.checkValidity()) {
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");

      // Custom error messages based on field ID
      if (field.id === "title") {
        field.setCustomValidity("Please fill out a title.");
      } else if (field.id === "image") {
        field.setCustomValidity("Please provide a valid URL for the image.");
      } else if (field.id === "deadline") {
        field.setCustomValidity("Please provide a valid deadline.");
      } else {
        field.setCustomValidity("This field is required.");
      }

      // Re-check validity to update the UI
      field.reportValidity();
    } else {
      // Field is valid
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    }
  }
}
