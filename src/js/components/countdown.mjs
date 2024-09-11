// Functionality to handle countdown for when listing ends

export function createCountdown(endsAt, container) {
  const countdown = document.createElement("p");

  function updateCountdown() {
    const now = new Date();
    const endTime = new Date(endsAt);
    const timeDifference = endTime - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdown.textContent = `Listing ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdown.textContent = "Listing has ended";
      countdown.classList.add("text-danger");
      clearInterval(intervalId);
    }
  }

  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();

  container.appendChild(countdown);

  return countdown;
}
