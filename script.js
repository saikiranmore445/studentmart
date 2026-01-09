
// Application State
let currentUser = null;
let products = [
  {
    id: 1,
    name: "Casio Scientific Calculator FX-991ES",
    price: 899,
    category: "electronics",
    description: "Advanced scientific calculator with 417 functions, natural display, and solar power",
    image: "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg",
    seller: "student123"
  },
  {
    id: 2,
    name: "Data Structures and Algorithms Textbook",
    price: 1299,
    category: "books",
    description: "Comprehensive guide to DSA with C++ examples, perfect for computer science students",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    seller: "saikiran"
  },
  {
    id: 3,
    name: "Wireless Bluetooth Headphones",
    price: 2499,
    category: "electronics",
    description: "High-quality wireless headphones with noise cancellation, perfect for studying",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    seller: "student123"
  },
  {
    id: 4,
    name: "Premium Notebook Set (5 Pack)",
    price: 450,
    category: "stationery",
    description: "High-quality ruled notebooks with hard cover, perfect for all subjects",
    image: "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg",
    seller: "saikiran"
  },
  {
    id: 5,
    name: "Engineering Drawing Instruments Set",
    price: 799,
    category: "tools",
    description: "Complete geometry box with compass, divider, protractor, and rulers",
    image: "https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg",
    seller: "student123"
  },
  {
    id: 6,
    name: "Mechanical Engineering Handbook",
    price: 1599,
    category: "books",
    description: "Essential reference book for mechanical engineering students with formulas and concepts",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    seller: "saikiran"
  },
  {
    id: 7,
    name: "Adjustable Laptop Stand",
    price: 1899,
    category: "electronics",
    description: "Ergonomic aluminum laptop stand with adjustable height and angle",
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
    seller: "student123"
  },
  {
    id: 8,
    name: "Digital Multimeter",
    price: 1299,
    category: "electronics",
    description: "Professional digital multimeter for electrical engineering students",
    image: "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg",
    seller: "saikiran"
  },
  {
    id: 9,
    name: "Highlighter Pen Set (12 Colors)",
    price: 299,
    category: "stationery",
    description: "Vibrant highlighter pens for marking important notes and textbooks",
    image: "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg",
    seller: "student123"
  },
  {
    id: 10,
    name: "Physics Laboratory Manual",
    price: 699,
    category: "books",
    description: "Complete physics lab manual with experiments and procedures",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    seller: "saikiran"
  }
];

let cart = [];
let filteredProducts = [...products];

// Valid users for authentication
let validUsers = [
  { id: "student123", password: "pass123" },
  { id: "saikiran", password: "1234" }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  checkLoginStatus();
  displayProducts();
  updateStats();
  setupEventListeners();
});

// Event Listeners Setup
function setupEventListeners() {
  // Login form
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  
  // Register form
  document.getElementById('register-form').addEventListener('submit', handleRegister);
  
  // Add product form
  document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);
  
  // Contact form
  document.getElementById('contact-form').addEventListener('submit', handleContact);
  
  // Search and filter
  document.getElementById('search-input').addEventListener('input', searchProducts);
  document.getElementById('category-filter').addEventListener('change', filterProducts);
  
  // Image upload preview
  document.getElementById('product-image').addEventListener('change', handleImageUpload);
}

// Authentication Functions
function checkLoginStatus() {
  const userId = localStorage.getItem('studentId') || sessionStorage.getItem('studentId');
  if (userId) {
    currentUser = userId;
    document.getElementById('user-greeting').textContent = `Hello, ${userId}`;
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('register-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'inline-block';
  } else {
    currentUser = null;
    document.getElementById('user-greeting').textContent = '';
    document.getElementById('login-link').style.display = 'inline-block';
    document.getElementById('register-link').style.display = 'inline-block';
    document.getElementById('logout-link').style.display = 'none';
  }
}

function handleRegister(e) {
  e.preventDefault();
  const id = document.getElementById('register-student-id').value.trim();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();
  const confirmPassword = document.getElementById('register-confirm-password').value.trim();
  const course = document.getElementById('register-course').value.trim();
  const termsAgreed = document.getElementById('terms-agreement').checked;

  // Validation
  if (password !== confirmPassword) {
    showMessage('Passwords do not match!', 'error');
    return;
  }

  if (!termsAgreed) {
    showMessage('Please agree to the Terms and Conditions!', 'error');
    return;
  }

  // Check if user already exists
  const existingUser = validUsers.find(u => u.id === id);
  if (existingUser) {
    showMessage('Student ID already exists! Please choose a different ID.', 'error');
    return;
  }

  // Add new user
  validUsers.push({ id, password, name, email, course });
  
  showMessage(`Registration successful! Welcome ${name}. You can now login with your credentials.`, 'success');
  document.getElementById('register-form').reset();
  
  // Redirect to login page
  setTimeout(() => {
    showPage('login');
  }, 2000);
}

function handleLogin(e) {
  e.preventDefault();
  const id = document.getElementById('student-id').value.trim();
  const password = document.getElementById('password').value.trim();
  const rememberMe = document.getElementById('remember-me').checked;

  const user = validUsers.find(u => u.id === id && u.password === password);

  if (user) {
    if (rememberMe) {
      localStorage.setItem('studentId', id);
    } else {
      sessionStorage.setItem('studentId', id);
    }
    
    showMessage('✅ Login successful! Welcome to Student Mart.', 'success');
    checkLoginStatus();
    showPage('home');
    
    // Reset form
    document.getElementById('login-form').reset();
  } else {
    showMessage('❌ Invalid credentials. Please try again.', 'error');
  }
}

function logout() {
  localStorage.removeItem('studentId');
  sessionStorage.removeItem('studentId');
  currentUser = null;
  cart = [];
  updateCartDisplay();
  checkLoginStatus();
  showMessage('✅ Logged out successfully!', 'success');
  showPage('home');
}

// Navigation Functions
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  
  // Remove active class from nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Show selected page
  document.getElementById(pageId + '-page').classList.add('active');
  
  // Add active class to corresponding nav link
  event.target.classList.add('active');
  
  // Check if user needs to be logged in for certain pages
  if (pageId === 'add' && !currentUser) {
    showMessage('❌ You must be logged in to add products.', 'error');
    showPage('login');
    return;
  }
}

// Product Functions
function displayProducts(productsToShow = products) {
  const productGrid = document.getElementById('product-grid');
  
  if (productsToShow.length === 0) {
    productGrid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
    return;
  }
  
  productGrid.innerHTML = productsToShow.map(product => `
    <div class="product-card" data-category="${product.category}">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
      <h3>${product.name}</h3>
      <div class="category">${product.category}</div>
      <div class="price">₹${product.price}</div>
      <div class="description">${product.description}</div>
      <div class="seller-info">Sold by: ${product.seller}</div>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join('');
}

function searchProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const categoryFilter = document.getElementById('category-filter').value;
  
  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                         product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  displayProducts(filteredProducts);
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  const preview = document.getElementById('image-preview');
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
  }
}

function filterProducts() {
  searchProducts(); // This will apply both search and filter
}

function handleAddProduct(e) {
  e.preventDefault();
  
  if (!currentUser) {
    showMessage('You must be logged in to add products.', 'error');
    return;
  }
  
  const name = document.getElementById('product-name').value.trim();
  const price = parseInt(document.getElementById('product-price').value);
  const category = document.getElementById('product-category').value;
  const description = document.getElementById('product-description').value.trim();
  
  // Handle image upload
  const imageFile = document.getElementById('product-image').files[0];
  let image = 'https://images.pexels.com/photos/159711/pexels-photo-159711.jpeg';
  
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      image = e.target.result;
      
      // Create and add the product after image is loaded
      const newProduct = {
        id: Date.now(), // Use timestamp for unique ID
        name,
        price,
        category,
        description,
        image,
        seller: currentUser
      };
      
      products.push(newProduct);
      filteredProducts = [...products];
      
      showMessage('✅ Product added successfully!', 'success');
      document.getElementById('add-product-form').reset();
      document.getElementById('image-preview').innerHTML = '';
      updateStats();
      
      // Refresh the product display on home page
      displayProducts();
      
      // Switch to home page to show the new product
      setTimeout(() => {
        showPage('home');
      }, 1500);
    };
    reader.readAsDataURL(imageFile);
  } else {
    // If no image uploaded, use default and add product immediately
    const newProduct = {
      id: Date.now(), // Use timestamp for unique ID
      name,
      price,
      category,
      description,
      image,
      seller: currentUser
    };
    
    products.push(newProduct);
    filteredProducts = [...products];
    
    showMessage('✅ Product added successfully!', 'success');
    document.getElementById('add-product-form').reset();
    document.getElementById('image-preview').innerHTML = '';
    updateStats();
    
    // Refresh the product display on home page
    displayProducts();
    
    // Switch to home page to show the new product
    setTimeout(() => {
      showPage('home');
    }, 1500);
  }
}

// Cart Functions
function addToCart(productId) {
  if (!currentUser) {
    showMessage('❌ Please login to add items to cart.', 'error');
    showPage('login');
    return;
  }
  
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartDisplay();
  showMessage(`🛒 ${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
  displayCartItems();
}

function updateCartQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
      displayCartItems();
    }
  }
}

function updateCartDisplay() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

function showCart() {
  if (!currentUser) {
    showMessage('❌ Please login to view your cart.', 'error');
    return;
  }
  
  document.getElementById('cart-modal').style.display = 'block';
  displayCartItems();
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
    cartTotal.textContent = '0';
    return;
  }
  
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div style="flex: 1; margin-left: 1rem;">
        <h4>${item.name}</h4>
        <p>₹${item.price} each</p>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <button onclick="updateCartQuantity(${item.id}, -1)" style="background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateCartQuantity(${item.id}, 1)" style="background: #4caf50; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">+</button>
        <button onclick="removeFromCart(${item.id})" style="background: #f44336; color: white; border: none; padding: 0.5rem; border-radius: 5px; cursor: pointer;">Remove</button>
      </div>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    showMessage('❌ Your cart is empty!', 'error');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Show professional success modal
  document.getElementById('success-message').innerHTML = `
    <strong>Order Details:</strong><br>
    Items: ${itemCount}<br>
    Total Amount: ₹${total}<br>
    Order ID: #SM${Date.now().toString().slice(-6)}
  `;
  
  document.getElementById('success-modal').style.display = 'block';
  
  cart = [];
  updateCartDisplay();
  closeCart();
}

function closeSuccessModal() {
  document.getElementById('success-modal').style.display = 'none';
}

// Contact Form Handler
function handleContact(e) {
  e.preventDefault();
  
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  
  // Simulate sending message
  showMessage(`✅ Thank you ${name}! Your message has been sent. We'll get back to you soon.`, 'success');
  document.getElementById('contact-form').reset();
}

// Utility Functions
function updateStats() {
  document.getElementById('total-products').textContent = products.length;
}

function showMessage(message, type) {
  const container = document.getElementById('message-container');
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  // Add to container
  container.appendChild(messageDiv);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 4000);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('cart-modal');
  const successModal = document.getElementById('success-modal');
  if (event.target === modal) {
    closeCart();
  }
  if (event.target === successModal) {
    closeSuccessModal();
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCart();
    closeSuccessModal();
  }
});