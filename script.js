document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));

    // Ouvre le panier quand on clique sur l’icône panier dans la navbar
    const cartToggle = document.getElementById("cartToggle");
    if (cartToggle) {
        cartToggle.addEventListener("click", (e) => {
            e.preventDefault();
            cartOffcanvas.show();
        });
    }
    

    // Fonction pour ajouter un produit au panier
    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
        cartOffcanvas.show(); // Affiche le panier automatiquement
    }

    // Fonction pour mettre à jour l'affichage du panier
    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("li");
            itemElement.className = "list-group-item d-flex justify-content-between align-items-center";
            itemElement.innerHTML = `
                <span>${item.name} - ${item.price.toFixed(2)} €</span>
                <button class="btn btn-sm btn-danger remove-item" data-index="${index}">X</button>
            `;
            cartContainer.appendChild(itemElement);
            total += item.price;
            document.getElementById("cart-count").textContent = cart.length;

        });

        cartTotal.textContent = total.toFixed(2);

        // Gestion des suppressions
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Attache les événements sur les vrais boutons présents dans le HTML
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const name = card.querySelector("h5").textContent.trim();
            const priceText = card.querySelector("p").textContent.trim();
            const price = parseFloat(priceText.replace(",", ".").replace(/[^\d.]/g, ""));
            addToCart(name, price);
        });
    });
});
