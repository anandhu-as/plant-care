"use client";

import { useState, useEffect } from "react";
import HouseholdHeader from "@/components/household/household-header";
import PlantList from "@/components/plants/plant-list";
import type { RememberedHousehold } from "@/lib/household-list";
import type { Plant } from "@/lib/db/schema";
import RememberHousehold from "@/components/household/remember-household";
import WelcomePopup from "@/components/ui/welcome-popup";

type PlantWithLastWatered = Plant & { lastWateredAt: Date | null };

export default function HouseholdClient({
  household,
  plants,
  token,
  households,
  origin,
  plantIdEnabled,
}: {
  household: any;
  plants: PlantWithLastWatered[];
  token: string;
  households: RememberedHousehold[];
  origin: string;
  plantIdEnabled: boolean;
}) {
  const [zenMode, setZenMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("zenMode");
    if (saved === "true") setZenMode(true);
  }, []);

  const toggleZenMode = () => {
    setZenMode((prev) => {
      const next = !prev;
      localStorage.setItem("zenMode", String(next));
      return next;
    });
  };

  if (!mounted) {
    // Prevent hydration mismatch by returning a clean wrapper
    return (
        <main className="min-h-screen bg-[#f5f1ea] p-5 sm:p-10 transition-colors duration-500">
            <div className="mx-auto max-w-2xl space-y-8">
                <RememberHousehold token={token} name={household.name} />
                <HouseholdHeader
                    name={household.name}
                    plantCount={plants.length}
                    token={token}
                    households={households}
                    origin={origin}
                    plantIdEnabled={plantIdEnabled}
                    zenMode={false}
                    toggleZenMode={toggleZenMode}
                />
                <PlantList token={token} plants={plants} zenMode={false} />
            </div>
        </main>
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 ${zenMode ? "bg-[#24211e]" : "bg-[#f5f1ea]"} p-5 sm:p-10`}>
      <WelcomePopup householdName={household.name} />
      <div className="mx-auto max-w-2xl space-y-8">
        <RememberHousehold token={token} name={household.name} />
        <HouseholdHeader
          name={household.name}
          plantCount={plants.length}
          token={token}
          households={households}
          origin={origin}
          plantIdEnabled={plantIdEnabled}
          zenMode={zenMode}
          toggleZenMode={toggleZenMode}
        />
        <PlantList token={token} plants={plants} zenMode={zenMode} />
      </div>
    </main>
  );
}
