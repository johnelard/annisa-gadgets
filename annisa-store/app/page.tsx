"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/SearchBar";

type Product = {
  name: string;
  price: string;
  status: string;
};

type OrderData = {
  product: Product;
  color: string;
  storage: string;
  batteryHealth: string;
  network: string;
  condition: string;
  freebies: string;
  quantity: number;
};

const products: Product[] = [
  {
    name: "iPhone XR",
    price: "₱1,099",
    status: "Order Now",
  },
  {
    name: "iPhone 11",
    price: "₱1,500",
    status: "Order Now",
  },
  {
    name: "iPhone 12",
    price: "Sold Out",
    status: "Sold Out",
  },
  {
    name: "iPhone 13 mini",
    price: "₱2,099",
    status: "Order Now",
  },
  {
    name: "iPhone 13",
    price: "₱2,500",
    status: "Order Now",
  },
  {
    name: "iPhone 15",
    price: "₱3,299",
    status: "Order Now",
  },
  {
    name: "iPhone 15 Plus",
    price: "₱3,500",
    status: "Order Now",
  },
  {
    name: "iPad 10th Gen",
    price: "Sold Out",
    status: "Sold Out",
  },
  {
    name: "iPad A16",
    price: "₱2,099",
    status: "Order Now",
  },
];

export default function Home() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm],
  );

  const handleCheckout = (order: OrderData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("annisaCheckoutOrder", JSON.stringify(order));
      router.push("/checkout");
    }
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f7", minHeight: "100vh", color: "#111" }}>
      <nav
        style={{
          background: "#000",
          color: "#fff",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0, letterSpacing: "0.08em" }}>🍎 ANNISA GADGETS</h2>

        <div style={{ display: "flex", gap: 25, flexWrap: "wrap" }}>
          <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
          <a href="#products" style={{ color: "#fff", textDecoration: "none" }}>Products</a>
          <a href="#about" style={{ color: "#fff", textDecoration: "none" }}>About</a>
          <a href="#contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</a>
        </div>
      </nav>

      <section
        style={{
          position: "relative",
          backgroundImage: "url('/products/IMG_0001.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111",
          color: "#fff",
          padding: "100px 20px 70px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.72) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <p style={{ margin: "0 0 10px", color: "#d1d1d6", textTransform: "uppercase", letterSpacing: "0.2em" }}>
            Premium gadgets • Trusted seller
          </p>
          <h1 style={{ fontSize: 60, margin: "0 0 16px", lineHeight: 1.05 }}>Annisa Gadgets</h1>
          <p style={{ fontSize: 20, margin: "0 auto 30px", maxWidth: 700, color: "#e5e7eb", lineHeight: 1.75 }}>
            Discover quality iPhones and iPads at competitive prices with reliable nationwide delivery and friendly customer support.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button
              style={{
                background: "#7c3aed",
                color: "#fff",
                border: "none",
                padding: "15px 44px",
                borderRadius: 30,
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.28)",
                padding: "15px 44px",
                borderRadius: 30,
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              View Catalog
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        style={{
          maxWidth: 1100,
          margin: "40px auto 0",
          background: "#0f172a",
          color: "#fff",
          borderRadius: 24,
          padding: "28px 24px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          paddingBottom: 30,
        }}
      >
        {[
          { label: "📍 Location", value: "Caloocan City ( inside Sm Sangandaan)" },
          { label: "🏢 Physical Store", value: "2nd Floor" },
          { label: "📦 Shipping", value: "Lbc Nationwide ( 35 Shipping Fee )" },
          { label: "🕙 Store Hours", value: "Monday–Thursday, 10:00 AM–3:00 PM" },
          { label: "📹 Reminder", value: "Take an unboxing video while opening the parcel in front of the rider." },
          { label: "🔄 Return Policy", value: "7-Day Return Policy" },
        ].map((item) => (
          <div key={item.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: "18px 20px" }}>
            <p style={{ margin: 0, color: "#7c3aed", fontWeight: 700 }}>{item.label}</p>
            <p style={{ margin: "8px 0 0", color: "#e2e8f0" }}>{item.value}</p>
          </div>
        ))}
      </section>

      <section
        id="products"
        style={{ maxWidth: 1200, margin: "50px auto 40px", padding: "0 20px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ margin: 0, color: "#7c3aed", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Featured devices</p>
            <h2 style={{ margin: "6px 0 0", fontSize: 30 }}>Popular gadgets ready to order</h2>
          </div>
          <p style={{ margin: 0, color: "#666" }}>Fresh stock • Secure payment • Easy pickup</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 25,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.name} product={product} onOrderClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      </section>

      <footer
        id="contact"
        style={{
          background: "#111",
          color: "#fff",
          textAlign: "center",
          padding: "24px 20px",
          marginTop: 40,
        }}
      >
        <p style={{ margin: 0 }}>Contact us for bulk orders, trade-ins, and delivery inquiries.</p>
      </footer>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onCheckout={handleCheckout} />

      <a
        href="https://www.tiktok.com/@annannstoreelegit?_r=1&_t=ZS-97jxAWgeHEC"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          background: "#7c3aed",
          color: "#fff",
          borderRadius: 999,
          padding: "14px 18px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        🎵 TikTok
      </a>
    </main>
  );
}
