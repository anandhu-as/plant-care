"use client";

import { identifyPlantAction, PlantIdentification } from "@/app/actions/identify-plant";
import { useState, useTransition } from "react";
import { toast } from "sonner";


const PlantPhotoIdentify = ({
  onIdentified,
  onImageChange,
}: {
  onIdentified: (match: PlantIdentification) => void;
  onImageChange?: (base64: string) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [matches, setMatches] = useState<PlantIdentification[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setMatches([]);
    setSelected(null);
    setPreview(URL.createObjectURL(file)); 

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) onImageChange?.(base64);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    startTransition(async () => {
      const result = await identifyPlantAction(formData);
      if (!result.success) {
        const errMsg = result.error ?? "Something went wrong.";
        setError(errMsg);
        toast.error("Species not found", { description: errMsg });
        return;
      }
      if (result.matches.length === 0) {
        const errMsg = "No matches found — try a clearer photo of a leaf.";
        setError(errMsg);
        toast.error("Species not found", { description: errMsg });
        return;
      }
      setMatches(result.matches);
      const top = result.matches[0];
      setSelected(top.scientificName);
      onIdentified(top);
      toast.success("Plant identified!", { 
        description: `Looks like a ${top.commonName ?? top.scientificName}.` 
      });
    });
  };

  const pickMatch = (m: PlantIdentification) => {
    setSelected(m.scientificName);
    onIdentified(m);
    toast.success("Match updated", { 
      description: `Selected ${m.commonName ?? m.scientificName}.` 
    });
  };

  return (
    <div className="col-span-2 space-y-3">
      <label className="block text-sm font-semibold text-emerald-800">
        Identify by photo 📸
      </label>

      <div className="flex items-start gap-3">
        {preview && (
         
          <img
            src={preview}
            alt="Uploaded plant"
            className="h-16 w-16 shrink-0 rounded-xl border border-emerald-200 object-cover shadow-sm"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isPending}
          className="block flex-1 text-sm text-emerald-600 file:mr-3 file:rounded-xl file:border-0 file:bg-emerald-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-600 transition cursor-pointer"
        />
      </div>

      {isPending && <p className="text-sm font-medium text-emerald-400">Identifying... 🌿</p>}
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      {matches.length > 0 && (
        <div className="bg-emerald-50/30 p-3 rounded-xl border border-emerald-100">
          <p className="mb-2 text-xs font-medium text-emerald-700">
            Top match applied — tap another if it&apos;s wrong:
          </p>
          <ul className="flex flex-wrap gap-2">
            {matches.map((m) => (
              <li key={m.scientificName}>
                <button
                  type="button"
                  onClick={() => pickMatch(m)}
                  className={`flex items-center gap-2 rounded-full border px-2 py-1 pr-3 text-sm transition shadow-sm cursor-pointer ${
                    selected === m.scientificName
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800 font-medium ring-2 ring-emerald-200"
                      : "border-emerald-200 bg-white text-stone-600 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  {m.imageUrl ? (

                    <img
                      src={m.imageUrl}
                      alt=""
                      className="h-6 w-6 rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    <span className="text-base">🌿</span>
                  )}
                  {m.commonName ?? m.scientificName}{" "}
                  <span className="text-stone-400 font-normal">
                    ({Math.round(m.confidence * 100)}%)
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlantPhotoIdentify;