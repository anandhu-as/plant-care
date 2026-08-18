"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { HOUSEHOLDS_COOKIE } from "@/lib/token";
import { parseHouseholdList, addToHouseholdList } from "@/lib/household-list";
import { createHouseHold } from "@/lib/queries/household";

async function rememberHousehold(token: string, name: string) {
  const cookieStore = await cookies();
  const existing = parseHouseholdList(cookieStore.get(HOUSEHOLDS_COOKIE)?.value);
  const updated = addToHouseholdList(existing, { token, name });

  cookieStore.set(HOUSEHOLDS_COOKIE, JSON.stringify(updated), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
}
//creates a new household in  db and saves token in cookie,
export const createHouseHoldAction = async (formData: FormData) => {
  const name = (formData.get("name") as string)?.trim() || "Ente veed 🪴";
  const household = await createHouseHold(name);
  await rememberHousehold(household.token, household.name);
  redirect(`/h/${household.token}`);
}


export const rememberHouseholdAction = async (token: string, name: string) => {
  await rememberHousehold(token, name);
}