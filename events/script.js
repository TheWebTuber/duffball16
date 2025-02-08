const searchInput = document.getElementById('search-input');
const announcementItems = document.querySelectorAll('.announcement-item');

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    announcementItems.forEach(item => {
        const date = item.dataset.date.toLowerCase();
        const text = item.dataset.text.toLowerCase();

        if (date.includes(searchTerm) || text.includes(searchTerm)) {
            item.style.display = ''; // Show the item
        } else {
            item.style.display = 'none'; // Hide the item
        }
    });
});