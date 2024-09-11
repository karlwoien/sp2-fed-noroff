import { addListing } from "../api/listing/create.mjs";

export function setAddListingFormListener() {
  const form = document.querySelector("#add-listing");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
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
      const response = await addListing(post);
      console.log("Listing successfully sent!", response);
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  });
}
