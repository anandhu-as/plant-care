"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "plantparent_welcomed";

export default function WelcomePopup({ householdName }: { householdName: string }) {
  const [open, setOpen]       = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) setOpen(true);
  }, []);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "true");
      setOpen(false);
      setClosing(false);
    }, 250);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
        onClick={dismiss}
        aria-modal="true"
        role="dialog"
        aria-labelledby="welcome-title"
      >
        {/* Card — matches the app's light card: bg-[#ebe3d5] */}
        <div
          className="relative w-full max-w-xs rounded-3xl overflow-hidden shadow-xl"
          style={{
            background: "#ebe3d5",
            animation: closing
              ? "wDown 0.25s ease forwards"
              : "wUp 0.4s cubic-bezier(0.34,1.4,0.64,1) both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-5 pt-5 pb-5 flex flex-col gap-4">

            {/* Hero row */}
            <div className="flex items-center gap-3">
              <span
                className="text-3xl select-none"
                style={{ animation: "wSway 4s ease-in-out infinite alternate" }}
              >
                🌿
              </span>
              <div>
                <h2
                  id="welcome-title"
                  className="text-base font-bold text-stone-900"
                >
                  Welcome to{" "}
                  <span className="text-emerald-700">Plant Parent</span>
                </h2>
                <p className="text-xs mt-0.5 text-stone-500">
                  You&apos;ve joined{" "}
                  <span className="font-semibold text-stone-700">{householdName}</span>
                  {" "}— a shared plant household 🪴
                </p>
              </div>
            </div>

            {/* Feature chips — matches "0 plants" pill style */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { e: "💧", label: "Track watering" },
                { e: "🏡", label: "Shared access" },
                { e: "🌱", label: "No sign-up" },
                { e: "🔍", label: "Plant ID" },
              ].map(({ e, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium text-emerald-700 bg-emerald-50"
                >
                  {e} {label}
                </span>
              ))}
            </div>

            {/* CTA — matches the "Add Plant" button exactly */}
            <button
              id="welcome-popup-dismiss"
              onClick={dismiss}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-white font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "#15803d",
                boxShadow: "0 2px 10px rgba(21,128,61,0.3)",
              }}
            >
              + Let me see the plants 🌱
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wUp   { from { opacity:0; transform:scale(0.92) translateY(14px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes wDown { from { opacity:1; transform:scale(1) translateY(0); } to { opacity:0; transform:scale(0.92) translateY(14px); } }
        @keyframes wSway { from { transform:rotate(-6deg); } to { transform:rotate(6deg); } }
      `}</style>
    </>
  );
}
