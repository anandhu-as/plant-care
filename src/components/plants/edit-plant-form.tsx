"use client";

import { useTransition, useState } from "react";
import { updatePlantAction } from "@/app/actions/plant";
import PlantPhotoIdentify from "@/components/plants/plant-photo-identify";
import { PlantIdentification } from "@/app/actions/identify-plant";
import { toast } from "sonner";
import { useEditPlantStore } from "@/store/edit-plant-store";
import { useUiStore } from "@/store/ui-store";

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 transition";

const EditPlantForm = ({ token, plantIdEnabled }: { token: string; plantIdEnabled: boolean }) => {
  const { editingPlant, closeEdit } = useEditPlantStore();
  const zenMode = useUiStore((s) => s.zenMode);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(editingPlant?.imageUrl ?? "");
  const [careGuideOpen, setCareGuideOpen] = useState(!!editingPlant?.careGuide);

  if (!editingPlant) return null;

  const handleIdentified = (match: PlantIdentification) => {
    const nameInput = document.getElementById("edit-name") as HTMLInputElement;
    const speciesInput = document.getElementById("edit-species") as HTMLInputElement;
    if (speciesInput) speciesInput.value = match.scientificName;
    if (!nameInput?.value.trim() && match.commonName) {
      if (nameInput) nameInput.value = match.commonName;
    }
  };

  const submitAction = async (formData: FormData) => {
    formData.set("imageUrl", imageUrl);
    startTransition(async () => {
      try {
        await updatePlantAction(token, editingPlant.id, formData);
        toast.success("Plant updated! 🌿");
        closeEdit();
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "An error occurred.";
        toast.error("Failed to update plant", { description: msg });
      }
    });
  };

  const overlayBg = zenMode ? "bg-black/60" : "bg-black/40";
  const modalBg = zenMode ? "bg-[#2a2520]" : "bg-[#ebe3d5]";
  const headingColor = zenMode ? "text-amber-50" : "text-emerald-950";
  const sectionBg = zenMode ? "bg-stone-800/60" : "bg-white/60";
  const labelColor = zenMode ? "text-stone-300" : "text-stone-700";
  const inputDark = zenMode
    ? "bg-stone-800 border-stone-600 text-amber-50 placeholder:text-stone-500 focus:ring-emerald-600/40"
    : "border-emerald-200 focus:ring-emerald-400/40";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayBg} backdrop-blur-sm p-4 animate-in fade-in duration-200`}
      onClick={closeEdit}
    >
      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto ${modalBg} rounded-3xl shadow-xl p-6 sm:p-8 animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeEdit}
          className={`absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full transition ${zenMode ? "bg-stone-700/50 text-stone-400 hover:bg-stone-600/50 hover:text-stone-200" : "bg-stone-200/50 text-stone-600 hover:bg-stone-300/50 hover:text-stone-900"}`}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className={`mb-6 font-semibold text-2xl flex items-center gap-2 ${headingColor}`}>
          <span className="text-3xl">{editingPlant.emoji || "🪴"}</span>
          Edit {editingPlant.name}
        </h2>

        <form action={submitAction} className={`space-y-4 ${sectionBg} p-6 rounded-2xl shadow-sm`}>
          {/* Photo */}
          <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
            <PlantPhotoIdentify
              onIdentified={handleIdentified}
              onImageChange={setImageUrl}
              identifyEnabled={plantIdEnabled}
            />
            {editingPlant.imageUrl && !imageUrl && (
              <div className="mt-2 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={editingPlant.imageUrl}
                  alt="Current plant photo"
                  className="h-12 w-12 rounded-lg object-cover border border-emerald-200"
                />
                <span className="text-xs text-stone-500">Current photo — upload new to replace</span>
              </div>
            )}
          </div>
          <input type="hidden" name="imageUrl" value={imageUrl || editingPlant.imageUrl || ""} />

          {/* Name */}
          <div>
            <label htmlFor="edit-name" className={`block text-sm font-semibold mb-1.5 ${labelColor}`}>Plant Name *</label>
            <input
              id="edit-name"
              name="name"
              defaultValue={editingPlant.name}
              placeholder="e.g. Monstera"
              required
              className={`${inputClass} ${inputDark}`}
            />
          </div>

          {/* Species + Emoji row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-species" className={`block text-sm font-semibold mb-1.5 ${labelColor}`}>Species</label>
              <input
                id="edit-species"
                name="species"
                defaultValue={editingPlant.species ?? ""}
                placeholder="Scientific name"
                className={`${inputClass} ${inputDark}`}
              />
            </div>
            <div>
              <label htmlFor="edit-emoji" className={`block text-sm font-semibold mb-1.5 ${labelColor}`}>Emoji</label>
              <input
                id="edit-emoji"
                name="emoji"
                defaultValue={editingPlant.emoji}
                placeholder="🪴"
                maxLength={4}
                className={`${inputClass} ${inputDark} text-center text-xl`}
              />
            </div>
          </div>

          {/* Watering interval */}
          <div>
            <label htmlFor="edit-watering" className={`block text-sm font-semibold mb-1.5 ${labelColor}`}>Water every N days</label>
            <input
              id="edit-watering"
              name="wateringIntervalDays"
              type="number"
              min={1}
              defaultValue={editingPlant.wateringIntervalDays}
              placeholder="7"
              className={`${inputClass} ${inputDark}`}
            />
          </div>

          {/* Care Guide */}
          <div>
            <button
              type="button"
              onClick={() => setCareGuideOpen((o) => !o)}
              className={`flex items-center gap-2 text-sm font-semibold w-full text-left mb-2 transition ${zenMode ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-700 hover:text-emerald-800"}`}
            >
              <span className="text-base">📋</span>
              Care Guide
              <svg
                className={`ml-auto h-4 w-4 transition-transform duration-200 ${careGuideOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {careGuideOpen && (
              <textarea
                name="careGuide"
                rows={6}
                defaultValue={editingPlant.careGuide ?? ""}
                placeholder={"💧 Watering: Water when the top inch of soil is dry.\n☀️ Light: Prefers bright, indirect sunlight.\n🌡️ Temperature: Thrives between 65–80°F (18–27°C).\n🌱 Soil: Well-draining potting mix.\n✂️ Pruning: Remove dead leaves regularly."}
                className={`${inputClass} ${inputDark} resize-y leading-relaxed font-mono text-sm`}
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 rounded-xl bg-[#469b61] px-4 py-3.5 text-lg font-semibold text-white transition hover:bg-[#3d8654] shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending && (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {!isPending && <span>💾</span>}
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlantForm;
