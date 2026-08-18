"use client";
import { useState, useTransition } from "react";
import { addPlantAction } from "@/app/actions/plant";
import PlantPhotoIdentify from "@/components/plants/plant-photo-identify";
import { PlantIdentification } from "@/app/actions/identify-plant";
import { toast } from "sonner";

const inputClass =
  "rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40";

const AddPlantForm = ({ token, plantIdEnabled }: { token: string; plantIdEnabled: boolean }) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleIdentified = (match: PlantIdentification) => {
    setSpecies(match.scientificName);
    if (!name.trim() && match.commonName) {
      setName(match.commonName);
    }
  };

  const handleImageChange = (base64: string) => {
    setImageUrl(base64);
  };

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await addPlantAction(token, formData);
        setIsSuccess(true);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "An error occurred.";
        toast.error("Failed to add plant", { description: msg });
      }
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleAddAnother = () => {
    setName("");
    setSpecies("");
    setImageUrl("");
    setIsSuccess(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleAddAnother();
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center h-10 px-3 sm:px-4 rounded-full bg-[#469b61] text-white font-medium transition hover:bg-[#3d8654] shadow-sm hover:shadow cursor-pointer gap-2"
        aria-label="Add Plant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span className="hidden sm:inline">Add Plant</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#ebe3d5] rounded-3xl shadow-xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-stone-200/50 text-stone-600 hover:bg-stone-300/50 hover:text-stone-900 transition"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="absolute -top-6 right-8 opacity-10 pointer-events-none">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 11 16 11 12M12 22C12 22 13 16 13 12M12 22V12M11 12C9 12 7 14 7 16C7 18 9 19 11 19C13 19 14 18 14 16M13 12C15 12 17 14 17 16C17 18 15 19 13 19C11 19 10 18 10 16M12 12C12 9 10 7 8 7C6 7 5 9 5 11C5 13 8 13 12 12ZM12 12C12 9 14 7 16 7C18 7 19 9 19 11C19 13 16 13 12 12Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="mb-6 font-semibold text-emerald-950 text-2xl flex items-center gap-2">
              <span className="text-3xl">🪴</span> Add a plant
            </h2>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center bg-white/60 p-8 rounded-2xl shadow-sm animate-in fade-in zoom-in duration-300">
                <div className="text-5xl mb-4 animate-bounce">🎉</div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-2">Done!</h3>
                <p className="text-stone-700 mb-8 text-center text-lg">Your plant has been successfully added to the household.</p>
                <div className="flex gap-4">
                  <button
                    onClick={handleAddAnother}
                    className="rounded-xl bg-[#469b61] px-5 py-2.5 font-semibold text-white transition hover:bg-[#3d8654] shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>🌱</span> Add another
                  </button>
                  <button
                    onClick={closeModal}
                    className="rounded-xl bg-stone-200 px-5 py-2.5 font-semibold text-stone-700 transition hover:bg-stone-300 flex items-center cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form action={submitAction} className="grid grid-cols-2 gap-4 bg-white/60 p-6 rounded-2xl shadow-sm">
                <div className="col-span-2 mb-2 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
                  <PlantPhotoIdentify
                    onIdentified={handleIdentified}
                    onImageChange={handleImageChange}
                    identifyEnabled={plantIdEnabled}
                  />
                </div>

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
                  className="col-span-2 mt-2 rounded-xl bg-[#469b61] px-4 py-3.5 text-lg font-semibold text-white transition hover:bg-[#3d8654] shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isPending && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
          </div>
        </div>
      )}
    </>
  );
};

export default AddPlantForm;