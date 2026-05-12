const productContainer = document.getElementById("productContainer");
const authModal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");
const authForm = document.getElementById("authForm");
const modalTitle = document.getElementById("modalTitle");
const toggleSignup = document.getElementById("toggleSignup");
const authSubmitBtn = document.getElementById("authSubmitBtn");
const fullNameField = document.getElementById("nameField");
const loginBtnNav = document.getElementById("loginBtnNav");
const logoutBtnNav = document.getElementById("logoutBtnNav");

let isSignupMode = false;
let medicines = [];
let currentUserId = null;
let pendingCartProduct = null;

// Medicine Data with Real Medicine Images
const medicineData = [
  { id: 1, name: "Aspirin 500mg", price: 150, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=300&h=250&fit=crop", desc: "Pain reliever and fever reducer", category: "Tablets" },
  { id: 2, name: "Paracetamol Tablets", price: 120, image: "https://images.unsplash.com/photo-1576091160550-112173faf62e?w=300&h=250&fit=crop", desc: "Effective for pain and fever", category: "Tablets" },
  { id: 3, name: "Ibuprofen 400mg", price: 180, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=250&fit=crop", desc: "Anti-inflammatory medication", category: "Tablets" },
  { id: 4, name: "Cough Syrup", price: 120, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=300&h=250&fit=crop", desc: "Relief from cough and cold", category: "Syrups" },
  { id: 5, name: "Vitamin C Syrup", price: 140, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=300&h=250&fit=crop", desc: "Boosts immunity", category: "Syrups" },
  { id: 6, name: "Multivitamin Capsules", price: 200, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=250&fit=crop", desc: "Daily nutrition supplement", category: "Capsules" },
  { id: 7, name: "Antibiotic Capsules", price: 250, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=250&fit=crop", desc: "Treats bacterial infections", category: "Capsules" },
  { id: 8, name: "Insulin Injection", price: 350, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=300&h=250&fit=crop", desc: "For diabetes management", category: "Injections" },
  { id: 9, name: "Vitamin B12 Injection", price: 280, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=300&h=250&fit=crop", desc: "Energy boost injection", category: "Injections" },
  { id: 10, name: "Antacid Tablets", price: 100, image: "https://images.unsplash.com/photo-1576091160550-112173faf62e?w=300&h=250&fit=crop", desc: "Relief from acidity", category: "Tablets" },
  { id: 11, name: "Omeprazole Capsules", price: 220, image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=250&fit=crop", desc: "Stomach acid reducer", category: "Capsules" },
  { id: 12, name: "Cough Drop Syrup", price: 130, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=300&h=250&fit=crop", desc: "Fast relief cough syrup", category: "Syrups" }
];

medicines = medicineData;

// Check if user is logged in
function checkLogin() {
  currentUserId = localStorage.getItem("currentUser");
  updateAuthUI();
}

// Update Auth UI
function updateAuthUI() {
  if (currentUserId) {
    loginBtnNav.style.display = "none";
    logoutBtnNav.style.display = "flex";
  } else {
    loginBtnNav.style.display = "flex";
    logoutBtnNav.style.display = "none";
  }
}

// Display Products
function displayProducts(items) {
  productContainer.innerHTML = "";

  items.forEach(item => {
    productContainer.innerHTML += `
      <div class="card" onclick="viewProductDetail(${item.id})">
        <img src="${item.image}" alt="${item.name}" style="cursor: pointer;">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p style="font-size: 0.9rem; color: #999;">${item.category}</p>
          <p class="price">₹ ${item.price}</p>
          <p>${item.desc}</p>
          <br>
          <button class="btn" onclick="handleAddToCart(event, ${item.id})">
            <i class="fas fa-shopping-cart"></i> Add To Cart
          </button>
        </div>
      </div>
    `;
  });
}

// View Product Detail
function viewProductDetail(id) {
  window.location.href = `product.html?id=${id}`;
}

// Show Login Prompt
function showLoginPrompt(event) {
  event.stopPropagation();
  alert("❌ Please login first to add items to cart!");
  isSignupMode = false;
  updateModalUI();
  showAuthModal();
}

// Handle Add to Cart with Auth Check
function handleAddToCart(event, id) {
  event.stopPropagation();
  addToCart(id);
}

// Add to Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = medicines.find(item => item.id === id);
  
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-count").innerText = cart.length;
    alert("✓ Product added to cart!");
  }
}

// Show Auth Modal
function showAuthModal() {
  authModal.style.display = "block";
}

// Hide Auth Modal
function hideAuthModal() {
  authModal.style.display = "none";
  authForm.reset();
  isSignupMode = false;
  updateModalUI();
}

// Update Modal UI
function updateModalUI() {
  if (isSignupMode) {
    modalTitle.textContent = "Create Account";
    fullNameField.style.display = "block";
    authSubmitBtn.textContent = "Sign Up";
    toggleSignup.textContent = "Already have an account? Login here";
  } else {
    modalTitle.textContent = "Login";
    fullNameField.style.display = "none";
    authSubmitBtn.textContent = "Login";
    toggleSignup.textContent = "Don't have an account? Sign up here";
  }
}

// Toggle between Login and Signup
toggleSignup.addEventListener("click", (e) => {
  e.preventDefault();
  isSignupMode = !isSignupMode;
  updateModalUI();
});

// Auth Form Submit
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  if (isSignupMode) {
    const fullName = document.getElementById("fullName").value;
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    // Store user
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[email] = { name: fullName, password: password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully!");
  }

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  // Login logic
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const user = users[email];

  if (user && user.password === password) {
    currentUserId = email;
    localStorage.setItem("currentUser", email);
    alert("✓ Login successful!");
    hideAuthModal();
    updateAuthUI();
    displayProducts(medicines);

    if (pendingCartProduct) {
      addToCart(pendingCartProduct);
      pendingCartProduct = null;
    }
  } else {
    alert("Invalid email or password");
  }
});

// Logout
logoutBtnNav.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  currentUserId = null;
  updateAuthUI();
  displayProducts(medicines);
  alert("Logged out successfully!");
});

// Close modal when clicking X
closeModal.addEventListener("click", hideAuthModal);

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === authModal) {
    hideAuthModal();
  }
});

// Login button in nav
loginBtnNav.addEventListener("click", (e) => {
  e.preventDefault();
  isSignupMode = false;
  updateModalUI();
  showAuthModal();
});

// Search functionality
const search = document.getElementById("search");
search.addEventListener("keyup", () => {
  const value = search.value.toLowerCase();
  const filtered = medicines.filter(item =>
    item.name.toLowerCase().includes(value) ||
    item.category.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

// Category filtering
const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    const filtered = medicines.filter(item => item.category === category);
    displayProducts(filtered);
    document.querySelector(".products-section").scrollIntoView({ behavior: "smooth" });
  });
});

// Shop Now button
const shopNowBtn = document.getElementById("shopNowBtn");
if (shopNowBtn) {
  shopNowBtn.addEventListener("click", () => {
    document.querySelector(".products-section").scrollIntoView({ behavior: "smooth" });
  });
}

// Initialize
checkLogin();
displayProducts(medicines);
const cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").innerText = cart.length;
document.getElementById("cart-count").innerText = cart.length;


displayProducts(medicines);