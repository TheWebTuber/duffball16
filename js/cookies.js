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




// <!-- Cookie Consent by TermsFeed https://www.TermsFeed.com -->
// <script type="text/javascript" src="https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js" charset="UTF-8"></script>
// <script type="text/javascript" charset="UTF-8">
// document.addEventListener('DOMContentLoaded', function () {
// cookieconsent.run({"notice_banner_type":"headline","consent_type":"express","palette":"dark","language":"en","page_load_consent_levels":["strictly-necessary"],"notice_banner_reject_button_hide":false,"preferences_center_close_button_hide":false,"page_refresh_confirmation_buttons":false,"website_name":"Duffball16","website_privacy_policy_url":"https://duffball16.com/privacypolicy"});
// });
// </script>

// <noscript>Free cookie consent management tool by <a href="https://www.termsfeed.com/">TermsFeed</a></noscript>
// <!-- End Cookie Consent by TermsFeed https://www.TermsFeed.com -->

// <a href="https://duffball16.com/privacypolicy" target="_blank">Privacy Policy </a>