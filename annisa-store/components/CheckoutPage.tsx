"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useProductImage } from "../hooks/useProductImage";

type CheckoutData = {
  product: {
    name: string;
    price: string;
    status: string;
  };
  color: string;
  storage: string;
  batteryHealth: string;
  network: string;
  condition: string;
  freebies: string;
  quantity: number;
};

type ShippingInfo = {
  name: string;
  phone: string;
  address: string;
  tiktokUsername: string;
};

const initialShippingInfo: ShippingInfo = {
  name: "",
  phone: "",
  address: "",
  tiktokUsername: "",
};

export default function CheckoutPage() {
  const [order, setOrder] = useState<CheckoutData | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(initialShippingInfo);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [orderId] = useState(() => `AN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const { imageUrl, loading } = useProductImage(order?.product?.name || "");

  const shippingComplete = Boolean(shippingInfo.name.trim() && shippingInfo.phone.trim() && shippingInfo.address.trim());
  const canContinueToPayment = shippingComplete;
  const canConfirm = proofFile !== null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("annisaCheckoutOrder");
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrder(JSON.parse(saved));
      }
    }
  }, []);

  if (!order) {
    return (
      <main style={{ minHeight: "100vh", padding: "80px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ marginBottom: 18, fontSize: 32 }}>No active order</h1>
          <p style={{ margin: 0, color: "#555" }}>Please select a product from the store first and continue to checkout.</p>
        </div>
      </main>
    );
  }

  if (checkoutComplete) {
    return (
      <main style={{ minHeight: "100vh", padding: "80px 20px", background: "#f8fafc", color: "#111" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 36, marginBottom: 12 }}>Order confirmed!</h1>
          <p style={{ margin: "0 0 24px", color: "#6b7280" }}>
            Thank you, {shippingInfo.name || "valued customer"}. Your order {orderId} has been submitted.
          </p>
          <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.06)" }}>
            <h2 style={{ margin: 0, fontSize: 24 }}>Shipping information</h2>
            <div style={{ marginTop: 20, display: "grid", gap: 12, color: "#4b5563" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Name</span><strong>{shippingInfo.name}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Phone</span><strong>{shippingInfo.phone}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Address</span><strong>{shippingInfo.address}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>TikTok</span><strong>{shippingInfo.tiktokUsername || "N/A"}</strong></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const steps = ["Order Summary", "Shipping Details", "Payment Method", "Confirmation"];

  return (
    <main style={{ minHeight: "100vh", padding: "80px 20px", background: "#f8fafc", color: "#111" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>Checkout</h1>
        <p style={{ margin: "0 0 24px", color: "#6b7280" }}>
          Complete your purchase by moving through each checkout step.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const active = checkoutStep === stepNumber;
            const completed = checkoutStep > stepNumber;
            return (
              <div
                key={label}
                style={{
                  flex: 1,
                  minWidth: 160,
                  padding: "14px 18px",
                  borderRadius: 18,
                  background: active ? "#7c3aed" : completed ? "#eef2ff" : "#fff",
                  color: active ? "#fff" : "#111",
                  border: completed ? "1px solid #c7d2fe" : "1px solid #e5e7eb",
                  textAlign: "center",
                  fontWeight: active || completed ? 700 : 500,
                }}
              >
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 20 }}>{stepNumber}</div>
              </div>
            );
          })}
        </div>

        {checkoutStep === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.06)" }}>
              <p style={{ margin: "0 0 12px", color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase" }}>Order summary</p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                <div style={{ position: "relative", width: 90, height: 90, borderRadius: 18, background: "#f3f4f6", overflow: "hidden", flexShrink: 0 }}>
                  {loading ? (
                    <div style={{ width: "100%", height: "100%" }} />
                  ) : (
                    <Image src={imageUrl} alt={order.product.name} fill sizes="90px" style={{ objectFit: "cover" }} />
                  )}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700 }}>{order.product.name}</p>
                  <p style={{ margin: "4px 0 0", color: "#6b7280" }}>{order.product.price}</p>
                </div>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { label: "Color", value: order.color },
                  { label: "Storage", value: order.storage },
                  { label: "Battery Health", value: order.batteryHealth },
                  { label: "Network", value: order.network },
                  { label: "Condition", value: order.condition },
                  { label: "Freebies", value: order.freebies },
                  { label: "Quantity", value: order.quantity },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#f8fafc", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                    <span style={{ color: "#64748b" }}>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>Order total</h2>
              <div style={{ background: "#f8fafc", borderRadius: 20, padding: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span>Unit price</span><strong>{order.product.price}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span>Quantity</span><strong>{order.quantity}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, fontSize: 18, fontWeight: 700 }}><span>Total</span><span>{order.product.price}</span></div>
              </div>
              <button type="button" onClick={() => setCheckoutStep(2)} style={{ width: "100%", marginTop: 24, padding: "14px 18px", borderRadius: 999, border: "none", background: "#7c3aed", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                Continue to Shipping
              </button>
            </section>
          </div>
        )}

        {checkoutStep === 2 && (
          <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Shipping details</h2>
            <div style={{ display: "grid", gap: 18 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontWeight: 700 }}>Full Name</span>
                <input value={shippingInfo.name} onChange={(event) => setShippingInfo({ ...shippingInfo, name: event.target.value })} placeholder="John Doe" style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #d1d5db" }} />
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontWeight: 700 }}>Mobile Number</span>
                <input value={shippingInfo.phone} onChange={(event) => setShippingInfo({ ...shippingInfo, phone: event.target.value })} placeholder="0917 123 4567" style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #d1d5db" }} />
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontWeight: 700 }}>Complete Address</span>
                <textarea value={shippingInfo.address} onChange={(event) => setShippingInfo({ ...shippingInfo, address: event.target.value })} placeholder="House #, Street, Barangay, City, Province" rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #d1d5db" }} />
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontWeight: 700 }}>TikTok Username</span>
                <input value={shippingInfo.tiktokUsername} onChange={(event) => setShippingInfo({ ...shippingInfo, tiktokUsername: event.target.value })} placeholder="@annannstoree" style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #d1d5db" }} />
              </label>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button type="button" onClick={() => setCheckoutStep(1)} style={{ flex: 1, padding: "14px 18px", borderRadius: 999, border: "1px solid #c7d2fe", background: "#fff", color: "#1d4ed8", fontWeight: 700, cursor: "pointer" }}>
                  Back to Summary
                </button>
                <button type="button" onClick={() => setCheckoutStep(3)} disabled={!canContinueToPayment} style={{ flex: 1, padding: "14px 18px", borderRadius: 999, border: "none", background: canContinueToPayment ? "#7c3aed" : "#c7d2fe", color: "#fff", fontWeight: 700, cursor: canContinueToPayment ? "pointer" : "not-allowed" }}>
                  Continue to Payment
                </button>
              </div>
            </div>
          </section>
        )}

        {checkoutStep === 3 && (
          <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Payment method</h2>
            <div style={{ display: "grid", gap: 18 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontWeight: 700 }}>Upload proof of payment</span>
                <input type="file" onChange={(event) => setProofFile(event.target.files?.[0] ?? null)} style={{ width: "100%" }} />
                {!canConfirm && (
                  <span style={{ color: "#dc2626", fontSize: 14 }}>
                    Proof of payment is required before confirming your order.
                  </span>
                )}
              </label>

              <div style={{ background: "#f8fafc", borderRadius: 20, padding: "18px", display: "grid", gap: 10, border: "1px solid #e5e7eb" }}>
                <p style={{ margin: 0, fontWeight: 700 }}>Pay with QR PH</p>
                <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.5 }}>
                  Kindly scan this QR code using your banking app, GCash, or PayMaya to pay. After payment, upload your proof of payment here.
                </p>
                <div style={{ position: "relative", width: "100%", maxWidth: 320, aspectRatio: "1", borderRadius: 18, margin: "0 auto", display: "block", overflow: "hidden" }}>
                  <Image src="/products/IMG_1146.jpeg" alt="QR PH payment code" fill sizes="320px" style={{ objectFit: "cover" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button type="button" onClick={() => setCheckoutStep(2)} style={{ flex: 1, padding: "14px 18px", borderRadius: 999, border: "1px solid #c7d2fe", background: "#fff", color: "#1d4ed8", fontWeight: 700, cursor: "pointer" }}>
                  Back to Shipping
                </button>
                <button type="button" onClick={() => setCheckoutStep(4)} disabled={!canConfirm} style={{ flex: 1, padding: "14px 18px", borderRadius: 999, border: "none", background: canConfirm ? "#7c3aed" : "#c7d2fe", color: "#fff", fontWeight: 700, cursor: canConfirm ? "pointer" : "not-allowed" }}>
                  Continue to Confirmation
                </button>
              </div>
            </div>
          </section>
        )}

        {checkoutStep === 4 && (
          <section style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Confirmation</h2>
            <div style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#f8fafc", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#64748b" }}>Product</span>
                  <strong>{order.product.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#f8fafc", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#64748b" }}>TikTok Username</span>
                  <strong>{shippingInfo.tiktokUsername || "N/A"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#f8fafc", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#64748b" }}>Shipping</span>
                  <strong>{shippingInfo.address}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, background: "#f8fafc", padding: 14, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#64748b" }}>Proof of payment</span>
                  <strong>{proofFile?.name || "Not uploaded"}</strong>
                </div>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button type="button" onClick={() => setCheckoutStep(3)} style={{ flex: 1, padding: "14px 18px", borderRadius: 999, border: "1px solid #c7d2fe", background: "#fff", color: "#1d4ed8", fontWeight: 700, cursor: "pointer" }}>
                  Back to Payment
                </button>
                <button type="button" onClick={() => {
                  setCheckoutComplete(true);
                  if (typeof window !== "undefined") {
                    window.localStorage.removeItem("annisaCheckoutOrder");
                  }
                }} disabled={!canConfirm} style={{ flex: 1, padding: "14px 18px", borderRadius: 999, border: "none", background: canConfirm ? "#7c3aed" : "#c7d2fe", color: "#fff", fontWeight: 700, cursor: canConfirm ? "pointer" : "not-allowed" }}>
                  Confirm Order
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
