// script.js

// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    console.log("Community Website Script Loaded!");

    // --- Future Interactivity Examples ---

    // Example: Add a click listener to each card (optional)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Don't trigger if the click was on a link inside the card
            if (event.target.tagName.toLowerCase() !== 'a') {
                console.log("Card clicked!", card);
                // You could navigate to a detail page, open a modal, etc.
                // const cardLink = card.querySelector('.card-link');
                // if (cardLink) {
                //     window.location.href = cardLink.href; // Go to the link's destination
                // }
            }
        });
    });

    // Example: Smooth scrolling for internal links (if you add them)
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });

    // Add more JavaScript functionality here as needed
    // - Image lightboxes (click image to enlarge)
    // - Filtering/sorting cards
    // - Loading more cards dynamically

}); // End of DOMContentLoaded