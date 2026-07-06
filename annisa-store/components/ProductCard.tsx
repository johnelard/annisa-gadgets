"use client";

import Image from "next/image";
import { useProductImage } from "../hooks/useProductImage";

type Product = {
  name: string;
  price: string;
  status: string;
};

export default function ProductCard({ product, onOrderClick }: { product: Product; onOrderClick?: () => void }) {
  const isSoldOut = product.status === "Sold Out";
  const { imageUrl, loading } = useProductImage(product.name);

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        {loading ? (
          <div style={{ background: "#f3f4f6" }} />
        ) : (
          <Image src={imageUrl} alt={product.name} fill className="product-image" sizes="(max-width: 768px) 100vw, 400px" />
        )}
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <p className={`price ${isSoldOut ? "sold-out" : "available"}`}>{product.price}</p>
        <button
          disabled={isSoldOut}
          className={`action-button ${isSoldOut ? "disabled" : "active"}`}
          onClick={isSoldOut ? undefined : onOrderClick}
        >
          {product.status}
        </button>
      </div>

      <style jsx>{`
        .product-card {
          background: #fff;
          border-radius: 24px;
          padding: 18px;
          text-align: center;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid #f1f1f5;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.14);
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 190px;
          margin-bottom: 14px;
          background: #f3f4f6;
          border-radius: 16px;
          overflow: hidden;
        }

        .product-image {
          object-fit: cover;
        }

        .product-content h3 {
          margin: 0 0 8px;
          font-size: 18px;
          color: #111;
        }

        .price {
          margin: 0 0 12px;
          font-size: 20px;
          font-weight: 700;
        }

        .price.available {
          color: #7c3aed;
        }

        .price.sold-out {
          color: #d70015;
        }

        .action-button {
          padding: 12px 24px;
          border-radius: 999px;
          border: none;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .action-button.active {
          background: #7c3aed;
        }

        .action-button.active:hover {
          background: #6d28d9;
        }

        .action-button.disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }
      `}</style>
    </article>
  );
}
