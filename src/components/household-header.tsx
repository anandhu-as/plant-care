import ShareLink from "@/components/share-link";

const HouseholdHeader = ({
    name,
    plantCount,
    token,
}: {
    name: string;
    plantCount: number;
    token: string;
}) => {
    return (
        <header className="flex items-start justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold text-stone-900 sm:text-3xl">{name}</h1>
                <p className="mt-0.5 text-sm text-stone-500">
                    {plantCount} plant{plantCount === 1 ? "" : "s"}
                </p>
            </div>
            <ShareLink token={token} />
        </header>
    );
};

export default HouseholdHeader;