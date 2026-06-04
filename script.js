let products = [];
let selectedProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  document.getElementById("close").onclick = () => {
    document.getElementById("lightbox").style.display = "none";
  };
});

// LOAD JSON
function loadData() {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      products = data;
      renderGallery();
    });
}

// RENDER
function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
    `;

    card.onclick = () => openLightbox(p);

    gallery.appendChild(card);
  });
}

// OPEN POPUP
function openLightbox(product) {
  selectedProduct = product;

  document.getElementById("lightbox-img").src = product.image;
  document.getElementById("lightbox-title").innerText = product.name;

  setupContact(product);

  document.getElementById("lightbox").style.display = "flex";
}

// CONNECT OPTIONS
function setupContact(product) {

  const phone = "614XXXXXXXX"; // change
  const email = "your@email.com"; // change

  const msg = `Hi, interested in: ${product.name}`;

  document.getElementById("whatsapp-btn").href =
    `https://wa.me/${phone}?text=` + encodeURIComponent(msg);

  document.getElementById("email-btn").href =
    `mailto:${email}?subject=` +
    encodeURIComponent("3D Model Enquiry") +
    `&body=` +
    encodeURIComponent(msg);
}