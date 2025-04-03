document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector("form");
    
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Merci pour votre message ! Nous vous répondrons bientôt.");
        contactForm.reset();
    });
});