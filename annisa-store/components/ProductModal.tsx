"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useProductImage } from "../hooks/useProductImage";

type Product = {
  name: string;
  price: string;
  status: string;
};

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onCheckout: (order: {
    product: Product;
    color: string;
    storage: string;
    batteryHealth: string;
    network: string;
    condition: string;
    freebies: string;
    quantity: number;
  }) => void;
};

const colorOptions: Record<string, string[]> = {
  "iPhone XR": ["Black", "White"],
  "iPhone 11": ["White", "Purple", "Black"],
  "iPhone 12": ["Blue", "White", "Black"],
  "iPhone 13 mini": ["Pink", "Midnight", "Blue"],
  "iPhone 13": ["Starlight", "Pink", "Blue"],
  "iPhone 15": ["Blue", "Pink"],
  "iPhone 15 Plus": ["Pink"],
  "iPad A16": ["White", "Pink"],
  "iPad 10th Gen": ["White", "Space Gray"],
};

export default function ProductModal({ product, onClose, onCheckout }: ProductModalProps) {
  const [color, setColor] = useState("Black");
  const [storage, setStorage] = useState("128GB");
  const [batteryHealth] = useState("100%");
  const [network] = useState("Unlocked");
  const [condition] = useState("Excellent");
  const [quantity, setQuantity] = useState(1);

  const colorChoices = useMemo(
    () => (product ? colorOptions[product.name] ?? ["Black"] : ["Black"]),
    [product],
  );

  const { imageUrl, loading } = useProductImage(product?.name || "");

  const freebies = useMemo(() => {
    if (!product) return "Case + Cable + Adaptor + Tempered Glass";
    const baseFreebies = "Case + Cable + Adaptor + Tempered Glass";
    if (product.name.includes("iPhone")) {
      return `${baseFreebies} + Magnetic Powerbank`;
    }
    if (product.name.includes("iPad")) {
      return `${baseFreebies} + Pencil`;
    }
    return baseFreebies;
  }, [product]);

  if (!product) return null;

  const productPrice = Number(product.price.replace(/[^0-9.-]+/g, ""));
  const totalPrice = productPrice * quantity;
  const formatPrice = (amount: number) =>
    `₱${amount.toLocaleString("en-PH", { maximumFractionDigits: 0 })}`;

  const colorSwatches: Record<string, string> = {
    Black: "#111827",
    White: "#f8fafc",
    Purple: "#7c3aed",
    Blue: "#2563eb",
    Pink: "#ec4899",
    Midnight: "#0f172a",
    Starlight: "#f8fafc",
    "Space Gray": "#374151",
  };

  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 760,
          padding: 24,
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 24 }}>Order {product.name}</h3>
            <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Customize your purchase before checkout.</p>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: 24, cursor: "pointer" }}>
            ×
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ position: "relative", width: "100%", height: 260, borderRadius: 20, overflow: "hidden", background: "#f3f4f6" }}>
            {loading ? (
              <div style={{ width: "100%", height: "100%", background: "#f3f4f6" }} />
            ) : (
              <Image src={imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
            )}

            <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Color</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  {colorChoices.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setColor(option)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        borderRadius: 999,
                        border: color === option ? "2px solid #7c3aed" : "1px solid #d1d5db",
                        background: color === option ? "rgba(124,58,237,0.12)" : "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: colorSwatches[option] ?? "#9ca3af",
                          border: option === "White" || option === "Starlight" ? "1px solid #d1d5db" : "none",
                          boxShadow: option === color ? "0 0 0 4px rgba(124,58,237,0.15)" : "none",
                        }}
                      />
                      <span style={{ color: "#111" }}>{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Storage</label>
                <select value={storage} onChange={(event) => setStorage(event.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #d1d5db" }}>
                  <option>128GB</option>
                  <option>256GB</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Quantity</label>
                <input type="number" value={quantity} min={1} onChange={(event) => setQuantity(Number(event.target.value))} style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #d1d5db" }} />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Freebies</label>
                <input value={freebies} readOnly style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #d1d5db", background: "#f8fafc" }} />
              </div>
            </div>
          </div>

          <div style={{ background: "#f8fafc", borderRadius: 20, padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ margin: "0 0 14px", color: "#7c3aed", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Order summary
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { label: "Color", value: color },
                  { label: "Storage", value: storage },
                  { label: "Battery Health", value: batteryHealth },
                  { label: "Freebies", value: freebies },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#fff", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                    <span style={{ color: "#64748b" }}>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#fff", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#64748b" }}>Subtotal</span>
                  <strong>{formatPrice(productPrice)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#fff", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#64748b" }}>Quantity</span>
                  <strong>{quantity}</strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, padding: 18, borderRadius: 18, background: "#fff", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#374151", fontWeight: 700 }}>Total</span>
                <span style={{ color: "#111", fontSize: 22, fontWeight: 700 }}>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCheckout({
                  product,
                  color,
                  storage,
                  batteryHealth,
                  network,
                  condition,
                  freebies,
                  quantity,
                })
              }
              style={{
                width: "100%",
                marginTop: 24,
                padding: "14px 18px",
                borderRadius: 999,
                border: "none",
                background: "#7c3aed",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
