"use server"
import { createHouseHold } from "@/lib/queries/household";
import { HOUSEHOLD_COOKIE } from "@/lib/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
//creates a new household in  db and saves token in cookie,
export const createHouseHoldAction = async (formData: FormData) => {
    const houseHoldName = (formData.get("name") as string)?.trim() || "ente veed";
    const houseHold = await createHouseHold(houseHoldName);
    if (!houseHold) {
        redirect("/");
    }
    const cookieStore = await cookies();
    cookieStore.set(HOUSEHOLD_COOKIE, houseHold.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
    });
    redirect(`/h/${houseHold.token}`);
}