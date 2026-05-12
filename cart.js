const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const emptyCart = document.getElementById("emptyCart");
const cartSummary = document.getElementById("cartSummary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "";
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  emptyCart.style.display = "none";
  cartSummary.style.display = "block";
  cartItems.innerHTML = "";

  let totalPrice = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price;
    itemCount++;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p style="color: #999; margin: 0.5rem 0;">${item.category}</p>
          <p style="font-size: 1rem; color: #666; margin-top: 0.5rem;">${item.desc}</p>
          <h4 style="color: #667eea; margin-top: 1rem;">₹ ${item.price}</h4>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
    `;
  });

  // Calculate totals
  const discount = Math.floor(totalPrice * 0.1);
  const delivery = 50;
  const finalTotal = totalPrice - discount + delivery;

  document.getElementById("subtotal").textContent = `₹ ${totalPrice}`;
  document.getElementById("discount").textContent = `- ₹ ${discount}`;
  document.getElementById("total").innerHTML = `
    <span>Total Amount:</span>
    <span>₹ ${finalTotal}</span>
  `;

  document.getElementById("cart-count").innerText = itemCount;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  alert("Item removed from cart!");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase! Order has been placed successfully. 🎉");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Initialize
displayCart();