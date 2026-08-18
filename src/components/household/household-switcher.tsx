"use client";
import Link from "next/link";
import { useState } from "react";
import type { RememberedHousehold } from "@/lib/household-list";

const HouseholdSwitcher = ({
  current,
  households,
}: {
  current: string;
  households: RememberedHousehold[];
}) => {
  const [open, setOpen] = useState(false);
  const others = households.filter((h) => h.token !== current);
  const currentHousehold = households.find((h) => h.token === current);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[#4d4438] bg-[#3b3228] px-4 py-2 text-sm font-semibold tracking-wide text-amber-50 transition hover:bg-[#4d4438] cursor-pointer shadow-sm"
      >
        Switch
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 sm:left-auto sm:right-0 z-20 mt-2 w-56 max-w-[90vw] rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
            {others.length > 0 ? (
              <ul className="space-y-1">
                {others.map((h) => (
                  <li key={h.token}>
                    <Link
                      href={`/h/${h.token}`}
                      className="block truncate rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {h.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-2 text-sm text-stone-400">No other households yet</p>
            )}
            <div className="my-1 h-px bg-stone-100" />
            <Link
              href="/?new=1"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              + Create another
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HouseholdSwitcher;