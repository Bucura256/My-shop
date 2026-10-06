// Shopping cart
let cart = [];

// Add product to cart
function addToCart(name, price) {

    // Check if product already exists
    let product = cart.find(item => item.name === name);

    if (product) {
        product.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

// Display cart
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>Price: UGX${item.price}</p>

                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

                <p>Subtotal: UGX${itemTotal}</p>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    cartTotal.textContent = "UGX" + total.toLocaleString();
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    displayCart();
}

// Remove product
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Clear entire cart
function clearCart() {
    cart = [];
    displayCart();
}

// Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert("Thank you for your order! Total: $" + total);

    cart = [];
    displayCart();
}
// Send order to WhatsApp
function sendOrderToWhatsApp(event) {

    event.preventDefault();

    // Check if cart is empty
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    // Get customer information
    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("delivery-address").value;

    // Your WhatsApp number
    // Replace this with YOUR number.
    // Use country code without + or spaces.
    const shopWhatsApp ="256773393538";

    // Create order message
    let message = "NEW SHOP ORDER\n\n";

    message += "Customer Name: " + name + "\n";
    message += "Customer Phone: " + phone + "\n";
    message += "Delivery Address: " + address + "\n\n";

    message += "ORDER DETAILS\n";
    message += "--------------------\n";

    let total = 0;

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        message +=
            item.name +
            " x " +
            item.quantity +
            " = $" +
            subtotal +
            "\n";
    });

    message += "--------------------\n";
    message += "TOTAL: $" + total + "\n\n";

    message += "Thank you!";

    // Convert message for WhatsApp URL
    const whatsappMessage = encodeURIComponent(message);

    // Open WhatsApp
    const whatsappURL =
        "https://wa.me/" +
        shopWhatsApp +
        "?text=" +
        whatsappMessage;

    window.open(whatsappURL, "_blank");

    // Clear cart and form
    cart = [];
    displayCart();

    document.getElementById("checkout-form").reset();
}
