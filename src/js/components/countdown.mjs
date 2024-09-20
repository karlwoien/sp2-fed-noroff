// Calculates the remaining time between the current time and the listing end time.
function getTimeRemaining(now, endTime) {
  const timeDifference = endTime - now;

  if (timeDifference <= 0) {
    return null;
  }

  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;

  const days = Math.floor(timeDifference / MS_PER_DAY);
  const hours = Math.floor((timeDifference % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((timeDifference % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((timeDifference % MS_PER_MINUTE) / MS_PER_SECOND);

  return { days, hours, minutes, seconds };
}

//Handles the countdown for when a listing ends and updates the DOM accordingly.
export function createCountdown(endsAt, container) {
  const countdown = document.createElement("p");
  const endTime = new Date(endsAt);

  function updateCountdown() {
    const now = new Date();
    const remainingTime = getTimeRemaining(now, endTime);

    if (remainingTime) {
      const { days, hours, minutes, seconds } = remainingTime;
      countdown.textContent = `Listing ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdown.textContent = "Listing has ended";
      countdown.classList.add("text-danger");
      clearInterval(intervalId); // Stop updating when time has ended
    }
  }

  // Start updating every second
  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown(); // Update immediately on load

  container.appendChild(countdown);
  return countdown;
}
