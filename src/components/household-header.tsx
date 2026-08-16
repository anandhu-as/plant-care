import ShareLink from "@/components/share-link";
import HouseholdSwitcher from "@/components/household-switcher";
import type { RememberedHousehold } from "@/lib/household-list";

const HouseholdHeader = ({
  name,
  plantCount,
  token,
  households,
}: {
  name: string;
  plantCount: number;
  token: string;
  households: RememberedHousehold[];
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
        <ShareLink token={token} />
      </div>
    </header>
  );
};

export default HouseholdHeader;