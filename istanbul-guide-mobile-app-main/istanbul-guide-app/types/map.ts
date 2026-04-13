export type MapCategory =
    | "Mosque"
    | "Palace"
    | "Museum"
    | "Historical Event"
    | "Monument";

export type MapItemType = "landmark" | "event";

export interface MapItem {
    id: string;
    type: MapItemType;
    title: string;
    description: string;
    category: MapCategory;
    latitude: number;
    longitude: number;
    period?: string;
}