"use client";

import { identifyPlantAction, PlantIdentification } from "@/app/actions/identify-plant";
import { useState, useTransition } from "react";


const PlantPhotoIdentify = ({
  onIdentified,
}: {
  onIdentified: (match: PlantIdentification) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [matches, setMatches] = useState<PlantIdentification[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setMatches([]);
    setSelected(null);
    setPreview(URL.createObjectURL(file)); 

    const formData = new FormData();
    formData.append("image", file);

    startTransition(async () => {
      const result = await identifyPlantAction(formData);
      if (!result.success) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      if (result.matches.length === 0) {
        setError("No matches found — try a clearer photo of a leaf.");
        return;
      }
      setMatches(result.matches);
      const top = result.matches[0];
      setSelected(top.scientificName);
      onIdentified(top);
    });
  }

  function pickMatch(m: PlantIdentification) {
    setSelected(m.scientificName);
    onIdentified(m);
  }

  return (
    <div className="col-span-2 space-y-3">
      <label className="block text-sm font-medium text-stone-700">
        Identify by photo
      </label>

      <div className="flex items-start gap-3">
        {preview && (
         
          <img
            src={preview}
            alt="Uploaded plant"
            className="h-16 w-16 shrink-0 rounded-lg border border-stone-200 object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isPending}
          className="block flex-1 text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-900"
        />
      </div>

      {isPending && <p className="text-sm text-stone-500">Identifying…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {matches.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs text-stone-500">
            Top match applied — tap another if it's wrong:
          </p>
          <ul className="flex flex-wrap gap-2">
            {matches.map((m) => (
              <li key={m.scientificName}>
                <button
                  type="button"
                  onClick={() => pickMatch(m)}
                  className={`flex items-center gap-2 rounded-full border px-2 py-1 pr-3 text-sm transition ${
                    selected === m.scientificName
                      ? "border-orange-700 bg-orange-50 text-orange-800"
                      : "border-stone-300 bg-white text-stone-700 hover:border-orange-700"
                  }`}
                >
                  {m.imageUrl ? (

                    <img
                      src={m.imageUrl}
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-base">🌿</span>
                  )}
                  {m.commonName ?? m.scientificName}{" "}
                  <span className="text-stone-400">
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