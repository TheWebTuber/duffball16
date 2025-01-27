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
      var ads = document.getElementsByClassName('adsbygoogle');
      for(var i=0; i < ads.length; i++) {
        ads[i].style.display = 'block';
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
      saveCookieSettings(false)
    });

    // Always show banner unless consent was given
      if(getCookie('cookieConsent')){
          handleCookieConsent(JSON.parse(getCookie('cookieConsent')));
          hideBanner()
      }else{
           cookieBanner.style.display = 'block';
      }
});