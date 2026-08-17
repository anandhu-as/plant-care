import HouseholdSwitcher from "@/components/household/household-switcher";
import ShareLink from "@/components/household/share-link";
import AddPlantForm from "@/components/plants/add-plant-form";
import type { RememberedHousehold } from "@/lib/household-list";

const HouseholdHeader = ({
  name,
  plantCount,
  token,
  households,
  origin,
  plantIdEnabled,
}: {
  name: string;
  plantCount: number;
  token: string;
  households: RememberedHousehold[];
  origin: string;
  plantIdEnabled: boolean;
}) => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-[#ebe3d5] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">{name}</h1>
          <p className="mt-1 text-base text-emerald-700 font-medium bg-emerald-50 inline-block px-3 py-1 rounded-full">
            {plantCount} plant{plantCount === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <HouseholdSwitcher current={token} households={households} />
          <ShareLink token={token} origin={origin} />
          <a
            href="/?new=1"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100/80 text-emerald-700 transition hover:bg-emerald-200 hover:text-emerald-800 cursor-pointer shadow-sm hover:shadow"
            aria-label="New Household"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </a>
          <AddPlantForm token={token} plantIdEnabled={plantIdEnabled} />
        </div>
      </header>

      <div className="flex items-center gap-2 px-2">
        <h2 className="text-xl font-semibold text-stone-800">My Plants</h2>
        <div className="h-px bg-stone-200 flex-grow ml-4"></div>
      </div>
    </div>
  );
};

export default HouseholdHeader;