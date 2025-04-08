document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));

    const cartToggle = document.getElementById("cartToggle");
    if (cartToggle) {
        cartToggle.addEventListener("click", (e) => {
            e.preventDefault();
            cartOffcanvas.show();
        });
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();

        // ✅ Affiche le toast
        const toastBody = document.querySelector("#toastNotif .toast-body");
        toastBody.textContent = `✅ ${name} ajouté au panier !`;
        const toastEl = document.getElementById("toastNotif");
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemElement = document.createElement("li");
            itemElement.className = "list-group-item d-flex justify-content-between align-items-center";
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <div class="d-flex align-items-center ms-auto flex-shrink-0" style="min-width: 180px;">
                    <button class="btn btn-sm btn-outline-secondary me-1 decrease-qty" data-index="${index}">-</button>
                    <span class="mx-1">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-1 increase-qty" data-index="${index}">+</button>
                    <span class="fixed-price ms-3">${(item.price * item.quantity).toFixed(2)} €</span>
                    <button class="btn btn-sm btn-danger ms-2 remove-item" data-index="${index}">X</button>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Met à jour le total
        document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);

        // Supprimer un article
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });

        // Incrémenter quantité
        document.querySelectorAll(".increase-qty").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cart[index].quantity += 1;
                updateCart();
            });
        });

        // Décrémenter quantité
        document.querySelectorAll(".decrease-qty").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });
    }

    // ✅ Boutons d’ajout au panier
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
