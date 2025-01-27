// Function to check if the user has given consent for cookies
function checkCookieConsent() {
  const consent = getCookie('cookieConsent');
  if (consent === 'accepted') {
      document.getElementById('cookie-banner').style.display = 'none';  // Hide banner if consent is given
  } else {
      document.getElementById('cookie-banner').style.display = 'block';  // Show banner if no consent
  }
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Function to set a cookie with an expiration date
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Set expiry time for the cookie
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";  // Set cookie
}

// Event listener for the "Accept All" button to set the cookie and hide the banner
document.getElementById('accept-cookies').addEventListener('click', function() {
  setCookie('cookieConsent', 'accepted', 30);  // Accept cookies and set cookie for 30 days
  document.getElementById('cookie-banner').style.display = 'none';  // Hide the consent banner
});

// Event listener for the "Reject All" button to reject cookies and hide the banner
document.getElementById('reject-cookies').addEventListener('click', function() {
  setCookie('cookieConsent', 'rejected', 30);  // Reject cookies and set cookie for 30 days
  document.getElementById('cookie-banner').style.display = 'none';  // Hide the consent banner
});

// Check if cookies have been accepted or rejected
checkCookieConsent();
