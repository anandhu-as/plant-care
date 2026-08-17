"use client";

import { createHouseHoldAction } from "@/app/actions/household";
import { SubmitButton } from "@/components/ui/submit-button";

const CreateHouseholdForm = () => {
  return (
    <form
      action={createHouseHoldAction}
      className="mx-auto flex w-full max-w-xs flex-col gap-3"
    >
      <input
        name="name"
        placeholder="e.g. Apartment 4B"
        className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700/40 focus:border-green-700/50"
      />
      <SubmitButton
        pendingText="Creating..."
        className="rounded-lg bg-green-800 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-green-900 active:scale-[0.98] cursor-pointer"
      >
        Create your household →
      </SubmitButton>
    </form>
  );
};

export default CreateHouseholdForm;
