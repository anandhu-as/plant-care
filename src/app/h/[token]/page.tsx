import { notFound } from "next/navigation";

import HouseholdHeader from "@/components/household-header";
import PlantList from "@/components/plant-list";
import AddPlantForm from "@/components/add-plant-form";
import { getHouseHoldByToken } from "@/lib/queries/household";
import { getPlantsForHousehold } from "@/lib/queries/plant";

const HouseholdPage = async ({
    params,
}: {
    params: Promise<{ token: string }>;
}) => {
    const { token } = await params;
    const household = await getHouseHoldByToken(token);
    if (!household) notFound();
    const plants = await getPlantsForHousehold(household.id);
    return (
        <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-5 sm:p-10">
            <div className="mx-auto max-w-2xl space-y-8">
                <HouseholdHeader name={household.name} plantCount={plants.length} token={token} />
                <PlantList token={token} plants={plants} />
                <AddPlantForm token={token} />
            </div>
        </main>
    );
}
export default HouseholdPage