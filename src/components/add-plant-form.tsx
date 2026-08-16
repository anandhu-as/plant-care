import { addPlantAction } from "@/app/actions/plant";

const inputClass =
    "rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-700/40";

const AddPlantForm = ({ token }: { token: string }) => {
    return (
        <section className="border-t border-stone-200 pt-6">
            <h2 className="mb-3 font-medium text-stone-900">Add a plant</h2>
            <form action={addPlantAction.bind(null, token)} className="grid grid-cols-2 gap-3">
                <input
                    name="name"
                    placeholder="Name (e.g. Monstera)"
                    required
                    className={`col-span-2 ${inputClass}`}
                />
                <input name="species" placeholder="Species (optional)" className={inputClass} />
                <input name="emoji" placeholder="Emoji" maxLength={4} className={inputClass} />
                <input
                    name="wateringIntervalDays"
                    type="number"
                    min={1}
                    placeholder="Water every N days (default 7)"
                    className={`col-span-2 ${inputClass}`}
                />
                <button
                    type="submit"
                    className="col-span-2 rounded-lg bg-stone-900 px-4 py-2.5 font-medium text-white transition hover:bg-orange-900"
                >
                    Add plant
                </button>
            </form>
        </section>
    );
};

export default AddPlantForm;