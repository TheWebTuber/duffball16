// document.addEventListener("DOMContentLoaded", function () {
//   const cookieBanner = document.getElementById("cookie-banner");
//   const acceptCookies = document.getElementById("accept-cookies");
//   const rejectCookies = document.getElementById("reject-cookies");

//   // Check if the user has already set their cookie preferences
//   if (!localStorage.getItem("cookiesAccepted")) {
//     cookieBanner.style.display = "block";
//   }

//   // Handle "Accept All" button click
//   acceptCookies.addEventListener("click", function () {
//     localStorage.setItem("cookiesAccepted", "true");
//     localStorage.setItem("analyticsCookies", "true");
//     localStorage.setItem("marketingCookies", "true");
//     cookieBanner.style.display = "none";
//     enableAllCookies();
//   });

//   // Handle "Reject All" button click
//   rejectCookies.addEventListener("click", function () {
//     localStorage.setItem("cookiesAccepted", "false");
//     localStorage.setItem("analyticsCookies", "false");
//     localStorage.setItem("marketingCookies", "false");
//     cookieBanner.style.display = "none";
//     disableAllCookies();
//   });

//   // Function to enable all cookies (e.g., load analytics scripts)
//   function enableAllCookies() {
//     console.log("All cookies enabled");
//   }

//   // Function to disable all cookies (e.g., block analytics scripts)
//   function disableAllCookies() {
//     console.log("All cookies disabled");
//   }
// });
