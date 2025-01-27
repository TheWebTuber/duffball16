// Function to check if the user has already given cookie consent
function checkCookieConsent() {
  const consent = getCookie('cookieConsent');
  if (consent === 'accepted') {
      // User has already accepted cookies, load non-essential cookies (AdSense, Analytics, etc.)
      loadAdsense();  // Load AdSense after consent
      loadGoogleAnalytics();  // Load Google Analytics if consent is given
  } else {
      // Block non-essential cookies and trackers until consent is provided
      blockCookies();
  }
}

// Function to get a cookie by name
function getCookie(name) {
  let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Function to set a cookie (with expiration time)
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set cookie expiration to X days
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

// Function to load AdSense script after consent
function loadAdsense() {
  const script = document.createElement('script');
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  document.head.appendChild(script);
}

// Function to load Google Analytics script after consent (you can anonymize IPs here for GDPR compliance)
function loadGoogleAnalytics() {
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-YOUR_TRACKING_ID';  // Replace with your Google Analytics ID
  document.head.appendChild(script);

  script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
          dataLayer.push(arguments);
      };
      gtag('js', new Date());
      gtag('config', 'UA-YOUR_TRACKING_ID');  // Replace with your Google Analytics ID
  };
}

// Function to block cookies if not accepted
function blockCookies() {
  // Prevent any non-essential cookies from being set until consent is provided
  console.log('Cookies are blocked until consent is provided');
}

// Event listener to accept cookies
document.getElementById('accept-cookies').addEventListener('click', function() {
  setCookie('cookieConsent', 'accepted', 30);  // Set cookie consent to 'accepted' for 30 days
  document.getElementById('cookie-banner').style.display = 'none';  // Hide the cookie banner
  loadAdsense();  // Load AdSense after acceptance
  loadGoogleAnalytics();  // Load Google Analytics after acceptance
});

// Event listener to reject cookies
document.getElementById('reject-cookies').addEventListener('click', function() {
  setCookie('cookieConsent', 'rejected', 30);  // Set cookie consent to 'rejected' for 30 days
  document.getElementById('cookie-banner').style.display = 'none';  // Hide the cookie banner
  blockCookies();  // Block all non-essential cookies
});

// Check if consent was already given when the page loads
checkCookieConsent();
