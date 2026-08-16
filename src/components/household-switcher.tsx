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
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-stone-600 transition hover:border-emerald-800 hover:text-emerald-800 cursor-pointer"
      >
        Switch ▾
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
            {others.length > 0 ? (
              <ul className="mb-1 space-y-1">
                {others.map((h) => (
                  <li key={h.token}>
                    <Link
                      href={`/h/${h.token}`}
                      className="block truncate rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
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
            <Link
              href="/?new=1"
              className="block rounded-lg border-t border-stone-100 px-3 py-2 pt-3 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
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