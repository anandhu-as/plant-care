import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

import { HOUSEHOLDS_COOKIE } from "@/lib/token";
import { parseHouseholdList } from "@/lib/household-list";
import HouseholdHeader from "@/components/household-header";

import PlantList from "@/components/plant-list";
import AddPlantForm from "@/components/add-plant-form";
import RememberHousehold from "@/components/remember-household";
import { getHouseHoldByToken } from "@/lib/queries/household";
import { getPlantsForHousehold } from "@/lib/queries/plant";

 const Page = async ({
    params,
}: {
    params: Promise<{ token: string }>;
}) => {
    const { token } = await params;
    const household = await getHouseHoldByToken(token);
    if (!household) notFound();

    const plants = await getPlantsForHousehold(household.id);
    const cookieStore = await cookies();
    const households = parseHouseholdList(cookieStore.get(HOUSEHOLDS_COOKIE)?.value);
    const host = (await headers()).get("host") || "localhost:3000";
    const protocol = host.startsWith("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    return (
        <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-5 sm:p-10">
            <div className="mx-auto max-w-2xl space-y-8">
                <RememberHousehold token={token} name={household.name} />
                <HouseholdHeader
                    name={household.name}
                    plantCount={plants.length}
                    token={token}
                    households={households}
                    origin={origin}
                />

                <PlantList token={token} plants={plants} />
                <AddPlantForm token={token} plantIdEnabled={!!process.env.PLANTNET_API_KEY} />
            </div>
        </main>
    );
}
export default Page