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
    <div className="flex flex-col gap-6 mb-8">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
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
            className="flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold tracking-wide text-white transition hover:bg-emerald-700 shadow-sm cursor-pointer"
          >
            +
          </a>
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