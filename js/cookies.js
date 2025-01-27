document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookies = document.getElementById("accept-cookies");
  const rejectCookies = document.getElementById("reject-cookies");
  const manageCookies = document.getElementById("manage-cookies");

  const necessaryCookies = document.getElementById("necessary-cookies");
  const statisticsCookies = document.getElementById("statistics-cookies");
  const marketingCookies = document.getElementById("marketing-cookies");

  // Check if user has already given consent
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "block";
  }

  // Accept All Cookies
  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    localStorage.setItem("statisticsCookies", "true");
    localStorage.setItem("marketingCookies", "true");
    cookieBanner.style.display = "none";
    enableAllCookies();
  });

  // Reject All Cookies
  rejectCookies.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "false");
    localStorage.setItem("statisticsCookies", "false");
    localStorage.setItem("marketingCookies", "false");
    cookieBanner.style.display = "none";
    disableAllCookies();
  });

  // Manage Cookies Button
  manageCookies.addEventListener("click", function () {
    cookieBanner.style.display = "block";
  });

  // Enable All Cookies
  function enableAllCookies() {
    statisticsCookies.checked = true;
    marketingCookies.checked = true;
    console.log("All cookies enabled.");
  }

  // Disable All Cookies
  function disableAllCookies() {
    statisticsCookies.checked = false;
    marketingCookies.checked = false;
    console.log("All cookies disabled.");
  }

  // Set Cookies Based on User Selection
  statisticsCookies.addEventListener("change", function () {
    localStorage.setItem("statisticsCookies", statisticsCookies.checked);
  });

  marketingCookies.addEventListener("change", function () {
    localStorage.setItem("marketingCookies", marketingCookies.checked);
  });
});
