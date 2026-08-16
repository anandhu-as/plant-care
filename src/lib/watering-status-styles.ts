export const statusStyles: Record<string, { chip: string; card: string }> = {
  overdue: { chip: "bg-red-50 text-red-700 border-red-200", card: "border-l-red-400" },
  "due-soon": { chip: "bg-amber-50 text-amber-700 border-amber-200", card: "border-l-amber-400" },
  ok: { chip: "bg-orange-50 text-orange-800 border-orange-200", card: "border-l-orange-700" },
  "never-watered": { chip: "bg-stone-100 text-stone-600 border-stone-200", card: "border-l-stone-300" },
};

export const statusLabels: Record<string, string> = {
  overdue: "Overdue",
  "due-soon": "Due soon",
  ok: "Happy",
  "never-watered": "Never watered",
};