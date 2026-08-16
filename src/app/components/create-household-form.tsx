import { createHouseHoldAction } from "../actions/household";
const CreateHouseholdForm = () => {
  return (
    <form
      action={createHouseHoldAction}
      className="mx-auto flex w-full max-w-xs flex-col gap-3"
    >
      <input
        name="name"
        placeholder="e.g. Apartment 4B"
        className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-700/40 focus:border-orange-700/50"
      />
      <button
        type="submit"
        className="rounded-lg bg-green-800 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-green-900 active:scale-[0.98] cursor-pointer    "
      >
        Create your household →
      </button>
    </form>
  );
};

export default CreateHouseholdForm;
