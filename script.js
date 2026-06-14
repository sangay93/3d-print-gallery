let products = [];
let selectedProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  // CLOSE LIGHTBOX
  const closeBtn = document.getElementById("close");
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById("lightbox").style.display = "none";
    };
  }

  // CLICK OUTSIDE LIGHTBOX TO CLOSE
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target.id === "lightbox") {
        lightbox.style.display = "none";
      }
    });
  }

  // ORDER FORM HANDLER (SAFE)
  const form = document.getElementById("order-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("user-email").value;
      const message = document.getElementById("message").value;

      const productName = selectedProduct
        ? selectedProduct.name
        : "Custom Request";

      const subject = `3D Print Order from ${name}`;

      const body = `
Name: ${name}
Email: ${email}

Product: ${productName}

Message:
${message}
      `;

      window.location.href =
        `mailto:your-email@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});

// LOAD DATA
function loadData() {
  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load data.json");
      return res.json();
    })
    .then((data) => {
      products = data;
      renderGallery();
    })
    .catch((err) => {
      console.error("Error loading gallery:", err);
    });
}

// RENDER GALLERY
function renderGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
    `;

    card.onclick = () => openLightbox(p);

    gallery.appendChild(card);
  });
}

// OPEN LIGHTBOX
function openLightbox(product) {
  selectedProduct = product;

  document.getElementById("lightbox-img").src = product.image;
  document.getElementById("lightbox-title").innerText = product.name;

  setupContact(product);

  document.getElementById("lightbox").style.display = "flex";
}

// WHATSAPP + EMAIL SETUP
function setupContact(product) {
  const phone = "614XXXXXXXX"; // 👉 change this
  const email = "sangay8300@email.com"; // 👉 change this

  const msg =
    `Hello 👋\n\nI'm interested in your 3D model:\n${product.name}\n\nPlease share price, material options, and print time.`;

  // WHATSAPP
  const whatsappBtn = document.getElementById("whatsapp-btn");
  if (whatsappBtn) {
    whatsappBtn.href =
      `https://wa.me/${phone}?text=` + encodeURIComponent(msg);
  }

  // EMAIL
  const emailBtn = document.getElementById("email-btn");
  if (emailBtn) {
    const mailto =
      `mailto:${email}?subject=${encodeURIComponent("3D Model Enquiry")}&body=${encodeURIComponent(msg)}`;

    emailBtn.setAttribute("href", mailto);
  }
}