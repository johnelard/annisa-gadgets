"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: "relative", minWidth: 260 }}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search iPhone or iPad"
        style={{
          width: "100%",
          padding: "12px 16px 12px 42px",
          borderRadius: 999,
          border: "1px solid #e5e7eb",
          fontSize: 15,
          outline: "none",
          boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#7c3aed",
          fontSize: 18,
        }}
      >
        🔎
      </span>
    </div>
  );
}
