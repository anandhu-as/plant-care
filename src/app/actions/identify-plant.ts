"use server";
export interface PlantIdentification {
    scientificName: string;
    commonName: string | null;
    confidence: number;
    imageUrl: string | null;
}

export interface IdentifyResult {
    success: boolean;
    matches: PlantIdentification[];
    error?: string;
}
export async function identifyPlantAction(formData: FormData): Promise<IdentifyResult> {
    const apiKey = process.env.PLANTNET_API_KEY;
    if (!apiKey) {
        return { success: false, matches: [], error: "Plant identification is not configured." };
    }

    const image = formData.get("image") as File | null;
    if (!image || image.size === 0) {
        return { success: false, matches: [], error: "No image provided." };
    }

    const upstreamForm = new FormData();
    upstreamForm.append("images", image);
    upstreamForm.append("organs", "leaf");
    try {
        const res = await fetch(
            `https://my-api.plantnet.org/v2/identify/all?api-key=${apiKey}`,
            { method: "POST", body: upstreamForm }
        );

        if (!res.ok) {
            const bodyText = await res.text();
            console.error("Pl@ntNet error", res.status, bodyText);
            return { success: false, matches: [], error: `Pl@ntNet error ${res.status}: ${bodyText.slice(0, 200)}` };
        }

        const data = await res.json();

        const matches: PlantIdentification[] = (data.results ?? [])
            .slice(0, 3)
            .map((r: {
                species: { scientificNameWithoutAuthor: string; commonNames?: string[] };
                score: number;
                images?: { url?: { m?: string } }[];
            }) => ({
                scientificName: r.species.scientificNameWithoutAuthor,
                commonName: r.species.commonNames?.[0] ?? null,
                confidence: r.score,
                imageUrl: r.images?.[0]?.url?.m ?? null,
            }));

        return { success: true, matches };
    } catch {
        return { success: false, matches: [], error: "Identification failed. Please try again." };
    }
}