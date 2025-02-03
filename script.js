// Admin Credentials
const adminCreds = {
    username: "limlush",
    password: "limlush21",
  };
  
  // Variables
  let limlush_products = JSON.parse(localStorage.getItem("limlush_products")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Admin Login
  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const productForm = document.getElementById("product-form");
  
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("admin-username").value;
      const password = document.getElementById("admin-password").value;
  
      if (username === adminCreds.username && password === adminCreds.password) {
        alert("Login successful!");
        adminPanel.classList.remove("hidden");
        loginForm.classList.add("hidden");
      } else {
        alert("Invalid credentials!");
      }
    });
  }
  
  // Add Product with Image
  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("product-name").value;
      const price = document.getElementById("product-price").value;
      const description = document.getElementById("product-description").value;
      const imageInput = document.getElementById("product-image");
  
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result;
        limlush_products.push({ id: Date.now(), name, price, description, image });
        localStorage.setItem("limlush_products", JSON.stringify(limlush_products));
        alert("Product added successfully!");
        productForm.reset();
      };
      reader.readAsDataURL(imageInput.files[0]);
    });
  }
  
  // Display limlush_products on Homepage
  const productList = document.getElementById("product-list");
  const cartCount = document.getElementById("cart-count");
  
  function displaylimlush_products(filter = "") {
    if (productList) {
      productList.innerHTML = "";
      limlush_products
        .filter((limlush_product) => limlush_product.name.toLowerCase().includes(filter.toLowerCase()))
        .forEach((limlush_product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("col-md-4");
          productCard.classList.add("mt-5");
          productCard.innerHTML = `
            
          
                <img src="${limlush_product.image}" alt="">
                <h3 class="name">${limlush_product.name}</h3>
                <p class="description">
                    ${limlush_product.description}
                </p>
                <h5 class="price">Price: $${limlush_product.price}</h5>
                <button onclick="addToCart(${limlush_product.id})">Add to Cart</button>
            
          `;
          productList.appendChild(productCard);
        });
    }
  }
  
  function addToCart(productId) {
    const product = limlush_products.find((p) => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
  
  // Update Cart Count
  function updateCartCount() {
    cartCount.textContent = cart.length;
  }
  
  const cartModal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  
  if (cartModal) {
    document.getElementById("cart-link").addEventListener("click", () => {
      displayCart();
      cartModal.classList.remove("hidden");
      cartModal.classList.remove("modal");
    });
  
    document.getElementById("close-cart").addEventListener("click", () => {
      cartModal.classList.add("hidden");
      cartModal.classList.add("modal");
    });
  }
  
  function displayCart() {
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      total += parseFloat(item.price);
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-image">
        <p>${item.name} - $${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });
  
    cartTotal.textContent = total.toFixed(2);
  }
  
  // Remove Item from Cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
  }
  
  // Sync Cart Count and Display Products on Page Load
  updateCartCount();
  if (productList) {
    displaylimlush_products();
  }
  