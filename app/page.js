"use client";

import { useEffect, useMemo, useState } from "react";

const productDetails = {
  "model1.jpg": {
    name: "Custom Figurine",
    tagline: "High-detail miniatures and display pieces.",
  },
  "model2.jpg": {
    name: "Architectural Model",
    tagline: "Precision parts for prototypes and concepts.",
  },
  "image1.jpg": {
    name: "Art Sculpture",
    tagline: "Bold, modern desktop decor for home or office.",
  },
  "image2.jpg": {
    name: "Mechanical Part",
    tagline: "Functional prints for machines, tools, and fixtures.",
  },
  "img5.jpg": {
    name: "Custom Gift",
    tagline: "Personalized gifts, prototypes, and accessories.",
  },
  "stupa1.jpg": {
    name: "Decorative Stupa",
    tagline: "Unique art pieces for home, shrine, or display.",
  },
};

const formatProductName = (imageName) => {
  const product = productDetails[imageName];
  return product ? product.name : imageName.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
};

export default function Home() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [order, setOrder] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    product: "",
    notes: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(Array.isArray(data) ? data : []));
  }, []);

  const selectedProduct = useMemo(() => {
    if (!selected) return null;
    return productDetails[selected] || {
      name: formatProductName(selected),
      tagline: "Premium 3D print for creators and collectors.",
    };
  }, [selected]);

  const handleOrderChange = (field, value) => {
    setOrder((prev) => ({ ...prev, [field]: value }));
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const payload = {
      ...order,
      product: order.product || selected || (images[0] ?? ""),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.address || !payload.product) {
      setStatus({ error: "Please complete your name, email, phone, address, and product choice." });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to submit order.");
      }

      setStatus({ success: data.message });
      setOrder({ name: "", email: "", address: "", quantity: 1, product: payload.product, notes: "" });
      setSelected(payload.product);
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#02030b] text-white">
      <header className="border-b border-white/10 px-6 py-6 backdrop-blur-sm sticky top-0 z-30 bg-[#02030b]/90">
        <div className="max-w-7xl mx-auto text-center">
          <p
            className="mx-auto inline-block text-4xl sm:text-6xl font-black uppercase tracking-[0.45em] text-transparent bg-gradient-to-r from-[#fbd76b] via-[#d4af37] to-[#f2d47a] bg-clip-text animate-kelsa-print"
            style={{ fontFamily: 'Arial Black, Gadget, sans-serif', textShadow: '1px 1px 0 rgba(0,0,0,0.55), 3px 3px 0 rgba(0,0,0,0.35)' }}
          >
            KELSA PRINT
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
        <div className="rounded-[2rem] border border-white/10 bg-[#0f1322] p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Popular items</p>
              <h2 className="mt-3 text-3xl font-bold">Top requests from KELSA PRINT buyers</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-400">Browse our most popular prints and get inspired for your custom order.</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {['model1.jpg', 'image1.jpg', 'stupa1.jpg'].map((img) => {
              const product = productDetails[img] || {
                name: formatProductName(img),
                tagline: "Premium 3D print for creators and collectors.",
              };
              return (
                <div key={img} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                  <img src={`/models/${img}`} alt={product.name} className="h-56 w-full object-cover" />
                  <div className="space-y-2 p-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Popular</p>
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <p className="text-sm text-slate-400">{product.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#04050f] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Product showcase</p>
                <h2 className="mt-3 text-3xl font-bold">KELSA PRINT featured models</h2>
              </div>
              <p className="max-w-xl text-slate-400">Choose a model, submit your details, and we will reach out on WhatsApp or SMS to finalize your request.</p>
            {images.map((img) => {
              const product = productDetails[img] || {
                name: formatProductName(img),
                tagline: "Premium 3D print for creators and collectors.",
              };

              return (
                <button
                  key={img}
                  type="button"
                  onClick={() => {
                    setSelected(img);
                    setOrder((prev) => ({ ...prev, product: img }));
                  }}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-[#d4af37]"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-slate-950">
                    <img src={`/models/${img}`} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="font-semibold text-white">{product.name}</p>
                        <p className="text-sm text-slate-400">{product.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300">Tap to view details and place your order.</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#0b0c15] p-8 shadow-xl shadow-black/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Submit your request</p>
                  <h2 className="mt-2 text-3xl font-bold">Tell KELSA PRINT what you need</h2>
                </div>
              </div>

              <div className="mt-8 grid gap-4 text-slate-300">
                <div className="rounded-3xl bg-slate-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Selected model</p>
                  <p className="mt-2 text-lg font-semibold text-white">{selectedProduct?.name || "Choose a product above"}</p>
                  <p className="mt-1 text-sm text-slate-400">{selectedProduct?.tagline || "Pick a product card to preview details."}</p>
                  <p className="mt-4 text-sm text-slate-500">We will contact you on WhatsApp or SMS and send your order summary by email.</p>
                </div>
                {selected && (
                  <div className="grid gap-3">
                    <div className="rounded-3xl bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">Product file</p>
                      <p className="mt-1 font-medium">{selected}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={submitOrder} className="space-y-6 rounded-[2rem] border border-white/10 bg-[#0b0c15] p-8 shadow-xl shadow-black/20">
              <div className="grid gap-5 sm:grid-cols-3">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Name</span>
                  <input
                    value={order.name}
                    onChange={(event) => handleOrderChange("name", event.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Email</span>
                  <input
                    type="email"
                    value={order.email}
                    onChange={(event) => handleOrderChange("email", event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Phone</span>
                  <input
                    type="tel"
                    value={order.phone}
                    onChange={(event) => handleOrderChange("phone", event.target.value)}
                    placeholder="WhatsApp or SMS number"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                </label>
              </div>

              <label className="block text-sm text-slate-300">
                <span>Shipping address</span>
                <textarea
                  value={order.address}
                  onChange={(event) => handleOrderChange("address", event.target.value)}
                  placeholder="Street, city, postal code"
                  rows={4}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Order quantity</span>
                  <input
                    type="number"
                    min={1}
                    value={order.quantity}
                    onChange={(event) => handleOrderChange("quantity", Number(event.target.value))}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Product choice</span>
                  <select
                    value={order.product || selected || (images[0] ?? "")}
                    onChange={(event) => {
                      const value = event.target.value;
                      handleOrderChange("product", value);
                      setSelected(value);
                    }}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  >
                    <option value="">Select a product</option>
                    {images.map((img) => (
                      <option key={img} value={img}>{formatProductName(img)}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm text-slate-300">
                <span>Additional notes</span>
                <textarea
                  value={order.notes}
                  onChange={(event) => handleOrderChange("notes", event.target.value)}
                  placeholder="Let us know your special requirements"
                  rows={3}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                />
              </label>

              {status?.error && (
                <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                  <p className="font-semibold text-red-100">Submission issue</p>
                  <p>{status.error}</p>
                </div>
              )}
              {status?.success && (
                <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  <p className="font-semibold text-emerald-100">Request received</p>
                  <p>{status.success}</p>
                </div>
              )}

              <p className="text-sm text-slate-400">After submission, you&apos;ll receive a WhatsApp or SMS confirmation and we will follow up personally.</p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-[#d4af37] px-5 py-4 text-sm font-semibold text-black transition hover:bg-[#c7992f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending request..." : "Submit request"}
              </button>
            </form>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-[#090b14] p-8 shadow-xl shadow-black/20">
            <div className="rounded-3xl bg-[#0f1322] p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">KELSA PRINT support</p>
              <h3 className="mt-3 text-2xl font-semibold">Send your model request today</h3>
              <p className="mt-4 text-slate-300">Share your design, request a quote, or ask for material recommendations and delivery options.</p>
            </div>
            <div className="grid gap-4 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-950/70 p-4">
                <p className="font-semibold text-white">Fast shipping</p>
                <p className="mt-2 text-slate-400">Delivery estimates based on material and size.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-4">
                <p className="font-semibold text-white">Quality control</p>
                <p className="mt-2 text-slate-400">Every print is inspected before dispatch.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#080a12] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b0d17] p-8 text-center shadow-2xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Connect with us</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Follow KELSA PRINT on every network</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400">
              Stay updated with the latest prints, custom requests, and fast WhatsApp/SMS support.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                { label: 'YouTube', href: 'https://www.youtube.com/' },
                { label: 'TikTok', href: 'https://www.tiktok.com/' },
                { label: 'Instagram', href: 'https://www.instagram.com/' },
                { label: 'WhatsApp', href: 'https://wa.me/' },
                { label: 'Facebook', href: 'https://www.facebook.com/' },
              ].map((network) => (
                <a
                  key={network.label}
                  href={network.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-[#d4af37] hover:text-white"
                >
                  {network.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-kelsa-print {
          animation: kelsa-print 4s ease-in-out infinite;
        }

        @keyframes kelsa-print {
          0% {
            opacity: 0;
            transform: translateY(-18px) scale(0.98);
            filter: blur(4px);
            letter-spacing: 0.8em;
          }
          25% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
            letter-spacing: 0.45em;
          }
          50% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          75% {
            opacity: 1;
            transform: translateY(0) scale(1);
            letter-spacing: 0.48em;
          }
          100% {
            opacity: 0.2;
            transform: translateY(4px) scale(1.02);
            filter: blur(1px);
          }
        }
      `}</style>

      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0e17] shadow-2xl shadow-black/50">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
            >
              Close
            </button>
            <div className="grid gap-6 p-8 lg:grid-cols-[0.95fr_0.85fr]">
              <div className="relative min-h-[22rem] rounded-[1.75rem] bg-slate-950/80">
                <img src={`/models/${selected}`} alt={selectedProduct.name} className="h-full w-full object-contain" />
              </div>
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Product preview</p>
                  <h3 className="text-3xl font-bold">{selectedProduct.name}</h3>
                  <p className="text-slate-300">{selectedProduct.tagline}</p>
                </div>
                <div className="grid gap-4 rounded-[1.5rem] bg-[#10141f] p-5 text-slate-300">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-400">File</span>
                    <span className="font-medium">{selected}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrder((prev) => ({ ...prev, product: selected }));
                    setStatus(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full rounded-3xl bg-[#d4af37] px-5 py-4 text-center font-semibold text-black transition hover:bg-[#c7992f]"
                >
                  Request this model
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
