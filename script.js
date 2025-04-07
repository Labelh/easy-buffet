document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartContainer = document.createElement('div');
    cartContainer.id = 'cart';
    cartContainer.style.position = 'fixed';
    cartContainer.style.top = '60px';
    cartContainer.style.right = '20px';
    cartContainer.style.width = '320px';
    cartContainer.style.background = '#fff';
    cartContainer.style.border = '1px solid #ccc';
    cartContainer.style.padding = '15px';
    cartContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    cartContainer.style.zIndex = '1000';
    cartContainer.style.display = 'none';
    cartContainer.style.maxHeight = '80vh';
    cartContainer.style.overflowY = 'auto';
    cartContainer.style.borderRadius = '10px';

    document.body.appendChild(cartContainer);

    const updateCart = () => {
        cartContainer.innerHTML = '<h5>🛒 Panier</h5>';
        if (cart.length === 0) {
            cartContainer.innerHTML += '<p>Votre panier est vide.</p>';
        } else {
            const list = document.createElement('ul');
            list.classList.add('list-group', 'mb-3');

            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';

                li.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>${item.price.toFixed(2)} € x ${item.qty}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-secondary me-1" data-action="decrease" data-index="${index}">-</button>
                        <button class="btn btn-sm btn-outline-secondary me-1" data-action="increase" data-index="${index}">+</button>
                        <button class="btn btn-sm btn-outline-danger" data-action="remove" data-index="${index}">✖</button>
                    </div>
                `;
                list.appendChild(li);
            });

            cartContainer.appendChild(list);

            const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
            const totalDisplay = document.createElement('p');
            totalDisplay.className = 'fw-bold text-end';
            totalDisplay.textContent = `Total : ${total.toFixed(2)} €`;
            cartContainer.appendChild(totalDisplay);
        }

        // Attacher les boutons après mise à jour
        cartContainer.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const index = parseInt(btn.getAttribute('data-index'));

                if (action === 'increase') {
                    cart[index].qty++;
                } else if (action === 'decrease') {
                    if (cart[index].qty > 1) {
                        cart[index].qty--;
                    } else {
                        cart.splice(index, 1);
                    }
                } else if (action === 'remove') {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });
    };

    // Ajout des boutons sur les cartes avec data-name et data-price
    document.querySelectorAll('.card').forEach(card => {
        const name = card.querySelector('h3')?.innerText.trim();
        const price = parseFloat(card.getAttribute('data-price') || 0);

        // Ajoute les attributs requis si absents
        card.setAttribute('data-name', name);
        card.setAttribute('data-price', price || 10); // prix par défaut

        const btn = document.createElement('button');
        btn.className = 'btn btn-primary mt-2';
        btn.innerText = 'Ajouter au panier';

        btn.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));

            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.qty++;
            } else {
                cart.push({ name, price, qty: 1 });
            }

            updateCart();
            cartContainer.style.display = 'block'; // 👉 Affichage auto du panier
        });

        card.querySelector('.card-body').appendChild(btn);
    });
});
