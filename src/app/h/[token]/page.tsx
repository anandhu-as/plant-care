import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

import { HOUSEHOLDS_COOKIE } from "@/lib/token";
import { parseHouseholdList } from "@/lib/household-list";
import { getHouseHoldByToken } from "@/lib/queries/household";
import { getPlantsForHousehold } from "@/lib/queries/plant";
import HouseholdClient from "@/components/household/household-client";

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
        <HouseholdClient
            household={household}
            plants={plants}
            token={token}
            households={households}
            origin={origin}
            plantIdEnabled={!!process.env.PLANTNET_API_KEY}
        />
    );
}
export default Page