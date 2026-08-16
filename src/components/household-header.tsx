import HouseholdSwitcher from "@/components/household-switcher";
import ShareLink from "@/components/share-link";
import type { RememberedHousehold } from "@/lib/household-list";

const HouseholdHeader = ({
  name,
  plantCount,
  token,
  households,
  origin,
}: {
  name: string;
  plantCount: number;
  token: string;
  households: RememberedHousehold[];
  origin: string;
}) => {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900 sm:text-3xl">{name}</h1>
        <p className="mt-0.5 text-sm text-stone-500">
          {plantCount} plant{plantCount === 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <HouseholdSwitcher current={token} households={households} />
        <ShareLink token={token} origin={origin} />
      </div>
    </header>
  );
};

export default HouseholdHeader;