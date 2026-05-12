const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

const productPage = document.getElementById("productPage");
const relatedProducts = document.getElementById("relatedProducts");
const authModal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");
const authForm = document.getElementById("authForm");
const modalTitle = document.getElementById("modalTitle");
const toggleSignup = document.getElementById("toggleSignup");
const authSubmitBtn = document.getElementById("authSubmitBtn");
const fullNameField = document.getElementById("nameField");

let isSignupMode = false;
let currentUserId = null;
let pendingCartProduct = null;

const medicineData = [

  {
    id: 1,
    name: "Aspirin 500mg",
    price: 150,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?auto=format&fit=crop&w=500&q=80",
    desc: "Pain reliever and fever reducer medicine.",
    category: "Tablets"
  },

  {
    id: 2,
    name: "Paracetamol Tablets",
    price: 120,
    image: "https://images.unsplash.com/photo-1576091160550-112173faf62e?auto=format&fit=crop&w=500&q=80",
    desc: "Used for fever and body pain relief.",
    category: "Tablets"
  },

  {
    id: 3,
    name: "Ibuprofen 400mg",
    price: 180,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=500&q=80",
    desc: "Anti-inflammatory pain relief medicine.",
    category: "Tablets"
  },

  {
    id: 4,
    name: "Cough Syrup",
    price: 120,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=500&q=80",
    desc: "Provides fast relief from cough and cold.",
    category: "Syrups"
  },

  {
    id: 5,
    name: "Vitamin C Syrup",
    price: 140,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80",
    desc: "Boosts immunity and energy naturally.",
    category: "Syrups"
  },

  {
    id: 6,
    name: "Multivitamin Capsules",
    price: 200,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80",
    desc: "Daily nutrition supplement capsules.",
    category: "Capsules"
  },

  {
    id: 7,
    name: "Antibiotic Capsules",
    price: 250,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
    desc: "Treats bacterial infections effectively.",
    category: "Capsules"
  },

  {
    id: 8,
    name: "Insulin Injection",
    price: 350,
    image: "https://images.unsplash.com/photo-1573883431205-98b5f10aaedb?auto=format&fit=crop&w=500&q=80",
    desc: "Used for diabetes management.",
    category: "Injections"
  },

  {
    id: 9,
    name: "Vitamin B12 Injection",
    price: 280,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
    desc: "Boosts energy and immunity.",
    category: "Injections"
  },

  {
    id: 10,
    name: "Antacid Tablets",
    price: 100,
    image: "https://images.unsplash.com/photo-1580281657527-47b4d6e3f6f1?auto=format&fit=crop&w=500&q=80",
    desc: "Relief from acidity and heartburn.",
    category: "Tablets"
  },

  {
    id: 11,
    name: "Omeprazole Capsules",
    price: 220,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=500&q=80",
    desc: "Reduces stomach acid problems.",
    category: "Capsules"
  },

  {
    id: 12,
    name: "Cough Drop Syrup",
    price: 130,
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=500&q=80",
    desc: "Quick relief from throat irritation.",
    category: "Syrups"
  },

  // NEW 20 PRODUCTS

  {
    id: 13,
    name: "Pain Relief Gel",
    price: 160,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031d4f7?auto=format&fit=crop&w=500&q=80",
    desc: "Muscle pain relief gel.",
    category: "Gel"
  },

  {
    id: 14,
    name: "Calcium Tablets",
    price: 190,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?auto=format&fit=crop&w=500&q=80",
    desc: "Strong bones and teeth support.",
    category: "Tablets"
  },

  {
    id: 15,
    name: "Protein Powder",
    price: 450,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=500&q=80",
    desc: "Nutrition supplement for body strength.",
    category: "Powder"
  },

  {
    id: 16,
    name: "Baby Care Lotion",
    price: 180,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=500&q=80",
    desc: "Gentle skincare lotion for babies.",
    category: "Lotion"
  },

  {
    id: 17,
    name: "Hand Sanitizer",
    price: 90,
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=500&q=80",
    desc: "Kills 99% germs instantly.",
    category: "Sanitizer"
  },

  {
    id: 18,
    name: "Face Mask Pack",
    price: 70,
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80",
    desc: "Protective face masks for safety.",
    category: "Safety"
  },

  {
    id: 19,
    name: "Thermometer",
    price: 250,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=500&q=80",
    desc: "Digital thermometer for temperature check.",
    category: "Device"
  },

  {
    id: 20,
    name: "Blood Pressure Monitor",
    price: 1200,
    image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=500&q=80",
    desc: "Monitor blood pressure at home.",
    category: "Device"
  },

  {
    id: 21,
    name: "Glucose Meter",
    price: 900,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=500&q=80",
    desc: "Blood sugar testing device.",
    category: "Device"
  },

  {
    id: 22,
    name: "Pain Killer Spray",
    price: 170,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80",
    desc: "Instant pain relief spray.",
    category: "Spray"
  },

  {
    id: 23,
    name: "Eye Drops",
    price: 110,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
    desc: "Relief from dry eyes and irritation.",
    category: "Drops"
  },

  {
    id: 24,
    name: "Nasal Spray",
    price: 140,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=500&q=80",
    desc: "Fast nasal congestion relief.",
    category: "Spray"
  },

  {
    id: 25,
    name: "Antiseptic Cream",
    price: 130,
    image: "https://images.unsplash.com/photo-1580281657527-47b4d6e3f6f1?auto=format&fit=crop&w=500&q=80",
    desc: "Helps heal cuts and wounds.",
    category: "Cream"
  },

  {
    id: 26,
    name: "Skin Care Cream",
    price: 220,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=80",
    desc: "Healthy glowing skin cream.",
    category: "Cream"
  },

  {
    id: 27,
    name: "Hair Growth Oil",
    price: 300,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=500&q=80",
    desc: "Improves hair growth naturally.",
    category: "Oil"
  },

  {
    id: 28,
    name: "Cold Relief Tablets",
    price: 95,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=500&q=80",
    desc: "Cold and flu symptom relief.",
    category: "Tablets"
  },

  {
    id: 29,
    name: "Digestive Syrup",
    price: 145,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80",
    desc: "Improves digestion and appetite.",
    category: "Syrups"
  },

  {
    id: 30,
    name: "First Aid Kit",
    price: 550,
    image: "https://images.unsplash.com/photo-1580281657527-47b4d6e3f6f1?auto=format&fit=crop&w=500&q=80",
    desc: "Emergency medical care essentials.",
    category: "Kit"
  }

];
// Check if user is logged in
function checkLogin() {
  currentUserId = localStorage.getItem("currentUser");
}

// Display Product Details
function displayProductDetails() {
  const product = medicineData.find(p => p.id === productId);

  if (!product) {
    productPage.innerHTML = `<p style="text-align: center; color: red; font-size: 1.2rem;">Product not found!</p>`;
    return;
  }

  let buttonHTML = '';
  if (currentUserId) {
    buttonHTML = `<button class="btn" onclick="handleAddToCart(${product.id})" style="margin-top: 2rem; padding: 1rem; font-size: 1.1rem;">
      <i class="fas fa-shopping-cart"></i> Add To Cart
    </button>`;
  } else {
    buttonHTML = `<button class="btn" style="margin-top: 2rem; padding: 1rem; font-size: 1.1rem; background: #999; cursor: not-allowed;" onclick="showLoginPrompt()">
      <i class="fas fa-lock"></i> Login to Add to Cart
    </button>`;
  }

  productPage.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-details">
      <h1>${product.name}</h1>
      <p style="color: #999; font-size: 1rem; margin: 0.5rem 0;">${product.category}</p>
      <h2>₹ ${product.price}</h2>
      <div style="background: #f0f8ff; padding: 1rem; border-radius: 8px; margin: 1.5rem 0;">
        <h3 style="margin-top: 0;">📋 About this medicine</h3>
        <p>${product.desc}</p>
      </div>
      <div style="margin: 1.5rem 0;">
        <h3 style="margin-top: 0;">✓ Key Benefits</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.5rem 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 0.5rem;"></i>Quality assured</li>
          <li style="padding: 0.5rem 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 0.5rem;"></i>Fast delivery available</li>
          <li style="padding: 0.5rem 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 0.5rem;"></i>100% genuine products</li>
          <li style="padding: 0.5rem 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 0.5rem;"></i>Expert consultation available</li>
        </ul>
      </div>
      ${buttonHTML}
    </div>
  `;
}

// Display Related Products
function displayRelatedProducts() {
  const currentProduct = medicineData.find(p => p.id === productId);
  const related = medicineData
    .filter(p => p.category === currentProduct.category && p.id !== productId)
    .slice(0, 4);

  relatedProducts.innerHTML = "";
  related.forEach(product => {
    let buttonHTML = '';
    if (currentUserId) {
      buttonHTML = `<button class="btn" onclick="handleAddToCart(event, ${product.id})">
        <i class="fas fa-shopping-cart"></i> Add To Cart
      </button>`;
    } else {
      buttonHTML = `<button class="btn" style="background: #999; cursor: not-allowed;" onclick="showLoginPrompt(event)">
        <i class="fas fa-lock"></i> Login to Add
      </button>`;
    }

    relatedProducts.innerHTML += `
      <div class="card" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
        <img src="${product.image}" alt="${product.name}">
        <div class="card-content">
          <h3>${product.name}</h3>
          <p class="price">₹ ${product.price}</p>
          ${buttonHTML}
        </div>
      </div>
    `;
  });
}

// Show Login Prompt
function showLoginPrompt(event) {
  if (event && event.stopPropagation) {
    event.stopPropagation();
  }
  alert("❌ Please login first to add items to cart!");
  isSignupMode = false;
  updateModalUI();
  showAuthModal();
}

// Handle Add to Cart
function handleAddToCart(event, id) {
  if (typeof event === "object" && event.stopPropagation) {
    event.stopPropagation();
  }
  addToCart(typeof event === "number" ? event : id);
}

// Add to Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = medicineData.find(item => item.id === id);
  
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
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[email] = { name: fullName, password: password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully!");
  }

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const user = users[email];

  if (user && user.password === password) {
    currentUserId = email;
    localStorage.setItem("currentUser", email);
    alert("✓ Login successful!");
    hideAuthModal();
    displayProductDetails();
    displayRelatedProducts();

    if (pendingCartProduct) {
      addToCart(pendingCartProduct);
      pendingCartProduct = null;
    }
  } else {
    alert("Invalid email or password");
  }
});

closeModal.addEventListener("click", hideAuthModal);

window.addEventListener("click", (e) => {
  if (e.target === authModal) {
    hideAuthModal();
  }
});

// Initialize
checkLogin();
displayProductDetails();
displayRelatedProducts();
const cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").innerText = cart.length;

closeModal.addEventListener("click", hideAuthModal);

window.addEventListener("click", (e) => {
  if (e.target === authModal) {
    hideAuthModal();
  }
});

// Initialize
checkLogin();
displayProductDetails();
displayRelatedProducts();
const cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").innerText = cart.length;