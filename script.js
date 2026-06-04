// PRODUCTS (from your folders)
const products = [
  { name: "Golden Buddha", image: "images/buddhas/buddha1.jpg", category: "buddhas" },
  { name: "Meditation Buddha", image: "images/buddhas/buddha2.jpg", category: "buddhas" },

  { name: "Rose Flower", image: "images/flowers/flower1.jpg", category: "flowers" },

  { name: "Mini Stupa", image: "images/stupas/stupa1.jpg", category: "stupas" },

  { name: "Toy Robot", image: "images/toys/toy1.jpg", category: "toys" }
];

let selectedProduct = null;

// LOAD GALLERY
function loadGallery(items) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
    `;

    div.onclick = () => openLightbox(p);

    gallery.appendChild(div);
  });
}

// FILTER CATEGORY
function filter(category) {
  if (category === "all") {
    loadGallery(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    loadGallery(filtered);
  }
}

// INIT
loadGallery(products);

// LIGHTBOX
function openLightbox(product) {
  selectedProduct = product;

  document.getElementById("lightbox-img").src = product.image;
  document.getElementById("lightbox-title").innerText = product.name;

  document.getElementById("lightbox").style.display = "flex";
}

// CLOSE
document.getElementById("close").onclick = () => {
  document.getElementById("lightbox").style.display = "none";
};

// ORDER OPEN
document.getElementById("want-btn").onclick = () => {
  document.getElementById("lightbox").style.display = "none";

  document.getElementById("selected-model").innerText =
    "Model: " + selectedProduct.name;

  document.getElementById("order-box").style.display = "block";
};

// SEND ORDER (simple demo)
function sendOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  if (!name || !phone || !message) {
    alert("Please fill all fields");
    return;
  }

  alert(
    "Order Sent!\n\n" +
    "Model: " + selectedProduct.name +
    "\nName: " + name +
    "\nPhone: " + phone +
    "\nMessage: " + message
  );

  document.getElementById("order-box").style.display = "none";
}