<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('accept-cookies');
  const rejectButton = document.getElementById('reject-cookies');

  // Function to set a cookie
  function setCookie(name, value, days) {
      let expires = "";
      if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  }

  // Function to get a cookie
  function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  }

  // Function to handle saving cookie settings
  function saveCookieSettings(allowMarketing) {
      const settings = {
          necessary: true,
          preferences: true,
          statistics: true,
          marketing: allowMarketing,
      };
      setCookie('cookieConsent', JSON.stringify(settings), 365);
      hideBanner(); // Hide the banner after saving.
      handleCookieConsent(settings);
  }
      function handleCookieConsent(settings){
      if(settings.marketing){
         //Load AdSense ads only if marketing cookies are allowed
          loadAdsenseAds();
      }else{
        // Hide AdSense ads if marketing cookies are not allowed
        hideAdsenseAds();
      }
    }
  function loadAdsenseAds() {
      const adScript = document.createElement('script');
      adScript.async = true;
      adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID`;
      adScript.crossOrigin = 'anonymous';

      document.head.appendChild(adScript);

     const ads = document.getElementsByClassName('adsbygoogle');
      for(let i=0; i < ads.length; i++) {
          ads[i].style.display = 'block';
           (adsbygoogle = window.adsbygoogle || []).push({});
      }
  }

  function hideAdsenseAds() {
      var ads = document.getElementsByClassName('adsbygoogle');
      for(var i=0; i < ads.length; i++) {
        ads[i].style.display = 'none';
      }
  }

  function hideBanner() {
      cookieBanner.style.display = 'none';
  }

  acceptButton.addEventListener('click', () => {
      saveCookieSettings(true);
  });

  rejectButton.addEventListener('click', () => {
      saveCookieSettings(false);
  });

  // Always show banner unless consent was given
    if(getCookie('cookieConsent')){
        handleCookieConsent(JSON.parse(getCookie('cookieConsent')));
        hideBanner()
    }else{
         cookieBanner.style.display = 'block';
    }
});




// <!-- Cookie Consent Banner -->
// <div id="cookie-banner" class="cookie-banner">
//     <p>We use cookies to enhance your experience on our website. By clicking 'Accept All', you consent to the use of cookies. You can reject all cookies by clicking 'Reject All'.</p>
//     <div class="cookie-buttons">
//       <button id="accept-cookies">Accept All</button>
//        <button id="reject-cookies">Reject All</button>
//       </div>
//       <p>
//           <a href="https://duffball16.com/cookies">Learn More about Cookies</a>
//           <a href="https://duffball16.com/privacypolicy">Privacy Policy</a>
//           <a href="https://duffball16.com/termsofservice">Terms of Service</a>
//       </p>
//   </div>

//   <!-- Include Google Adsense here  -->
//      <ins class="adsbygoogle"
//        style="display:block"
//        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
//        data-ad-slot="YOUR_AD_SLOT_ID"
//        data-ad-format="auto"
//        data-full-width-responsive="true"></ins>
=======

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("cookiesAccepted")) {
      document.getElementById("cookie-banner").style.display = "block";
    }
  
    document.getElementById("accept-cookies").addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookie-banner").style.display = "none";
    });
  });
  
>>>>>>> parent of ff485e6 (update terms of service with cookies)
