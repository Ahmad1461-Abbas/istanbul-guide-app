import { historicalPlaces } from "../constants/historicalPlaces";
import { MapItem } from "../types/map";

// Replace this with your laptop's current local IP.
// Use the same network your phone is on.
const API_BASE_URL = "http://192.168.1.108:3000";

export async function getHistoricalPlaces(): Promise<MapItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/places`);

        if (!response.ok) {
            throw new Error(`Failed to fetch places: ${response.status}`);
        }

        const data: MapItem[] = await response.json();
        return data;
    } catch (error) {
        console.warn("Falling back to local historicalPlaces:", error);
        return historicalPlaces;
    }
}