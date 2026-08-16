"use client";
import { useState } from "react";
import { addPlantAction } from "@/app/actions/plant";
import PlantPhotoIdentify from "@/components/plant-photo-identify";
import { PlantIdentification } from "@/app/actions/identify-plant";
import { toast } from "sonner";

const inputClass =
  "rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40";

const AddPlantForm = ({ token, plantIdEnabled }: { token: string; plantIdEnabled: boolean }) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useState(false); // We can just use a simple loading state or action

  const handleIdentified = (match: PlantIdentification) => {
    setSpecies(match.scientificName);
    // Remove the match.imageUrl override so we keep the user's uploaded image
    // if (match.imageUrl) {
    //   setImageUrl(match.imageUrl);
    // }
    if (!name.trim() && match.commonName) {
      setName(match.commonName);
    }
  };

  const handleImageChange = (base64: string) => {
    setImageUrl(base64);
  };

  const submitAction = async (formData: FormData) => {
    startTransition(true);
    try {
      await addPlantAction(token, formData);
      setIsSuccess(true);
    } catch (e: any) {
      toast.error("Failed to add plant", { description: e.message || "An error occurred." });
    } finally {
      startTransition(false);
    }
  };

  const handleAddAnother = () => {
    setName("");
    setSpecies("");
    setImageUrl("");
    setIsSuccess(false);
  };

  return (
    <section className="border-t border-emerald-200 pt-6 mt-8 relative overflow-hidden transition-all duration-500">
      {/* Decorative flower SVG */}
      <div className="absolute -top-6 right-0 opacity-20 pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C12 22 11 16 11 12M12 22C12 22 13 16 13 12M12 22V12M11 12C9 12 7 14 7 16C7 18 9 19 11 19C13 19 14 18 14 16M13 12C15 12 17 14 17 16C17 18 15 19 13 19C11 19 10 18 10 16M12 12C12 9 10 7 8 7C6 7 5 9 5 11C5 13 8 13 12 12ZM12 12C12 9 14 7 16 7C18 7 19 9 19 11C19 13 16 13 12 12Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <h2 className="mb-4 font-semibold text-emerald-950 text-xl flex items-center gap-2">
        <span className="text-2xl">🌿</span> Add a plant
      </h2>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100 shadow-sm animate-in fade-in zoom-in duration-300">
          <div className="text-4xl mb-4 animate-bounce">🎉</div>
          <h3 className="text-xl font-semibold text-emerald-950 mb-2">Done!</h3>
          <p className="text-emerald-700 mb-6 text-center">Your plant has been successfully added to the household.</p>
          <button
            onClick={handleAddAnother}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>🌱</span> Add another plant
          </button>
        </div>
      ) : (
        <form action={submitAction} className="grid grid-cols-2 gap-4 bg-emerald-50/20 p-6 rounded-2xl border border-emerald-100/80 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {plantIdEnabled && (
            <div className="col-span-2 mb-2 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
              <PlantPhotoIdentify onIdentified={handleIdentified} onImageChange={handleImageChange} />
            </div>
          )}

          <input type="hidden" name="imageUrl" value={imageUrl} />

          <input
            name="name"
            placeholder="Name (e.g. Monstera)"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`col-span-2 ${inputClass} border-emerald-200 focus:ring-emerald-400/40`}
          />
          <input
            name="species"
            placeholder="Species (optional)"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className={`${inputClass} border-emerald-200 focus:ring-emerald-400/40`}
          />
          <input name="emoji" placeholder="Emoji" maxLength={4} className={`${inputClass} border-emerald-200 focus:ring-emerald-400/40`} />
          <input
            name="wateringIntervalDays"
            type="number"
            min={1}
            placeholder="Water every N days (default 7)"
            className={`col-span-2 ${inputClass} border-emerald-200 focus:ring-emerald-400/40`}
          />
          <button
            type="submit"
            disabled={isPending}
            className="col-span-2 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700 shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending && (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {!isPending && <span>🌿</span>}
            {isPending ? "Planting..." : "Plant it!"}
          </button>
        </form>
      )}
    </section>
  );
};

export default AddPlantForm;