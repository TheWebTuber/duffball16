document.addEventListener('DOMContentLoaded', function() { // Ensures DOM is fully loaded
    
    const blogPosts = document.querySelectorAll(".blog-post");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDate = document.getElementById("modal-date");
    const modalImage = document.getElementById("modal-image");
    const modalText = document.getElementById("modal-text");
    const closeButton = document.querySelector(".close-button");

    blogPosts.forEach(post => {
        post.addEventListener("click", () => {
            const postId = post.dataset.postId;
            const selectedPost = posts.find(p => p.id === postId);

            modalTitle.textContent = selectedPost.title;
            modalDate.textContent = selectedPost.date;
            modalImage.src = selectedPost.image;
            modalImage.alt = selectedPost.title;
            modalText.textContent = selectedPost.text;

            modal.style.display = "block";
        });
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

}); // End of DOMContentLoaded listener