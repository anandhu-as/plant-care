export interface RememberedHousehold {
    token: string;
    name: string;
}

const MAX_REMEMBERED = 10;

export function parseHouseholdList(raw: string | undefined): RememberedHousehold[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}
export const addToHouseholdList = (
    list: RememberedHousehold[],
    entry: RememberedHousehold
): RememberedHousehold[] => {
    const withoutDupe = list.filter((h) => h.token !== entry.token);
    return [...withoutDupe, entry].slice(-MAX_REMEMBERED);
}