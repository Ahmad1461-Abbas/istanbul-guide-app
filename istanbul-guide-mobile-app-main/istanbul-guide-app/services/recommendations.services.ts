import { historicalPlaces } from "../constants/historicalPlaces";

export interface RecommendationResult {
    name: string;
    category: string;
    explanation: string;
    hybrid_score: number;
}

const API_BASE_URL = "http://192.168.1.107:8000"; // Using your computer's actual network IP

export async function getRecommendations(interests: string[]): Promise<RecommendationResult[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/recommendations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ interests, limit: 10, exclude_visited: false })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch recommendations: ${response.status}`);
        }

        const data = await response.json();
        return data.recommendations;
    } catch (error) {
        console.warn("Falling back to local data with mock explanations:", error);

        // Fallback mock using historicalPlaces if API is unreachable
        const mocks: RecommendationResult[] = [];
        for (const place of historicalPlaces) {
            let isMatch = interests.length === 0;
            if (!isMatch) {
                isMatch = interests.some(interest => 
                    place.title.toLowerCase().includes(interest.toLowerCase()) || 
                    place.category.toLowerCase().includes(interest.toLowerCase()) || 
                    place.description.toLowerCase().includes(interest.toLowerCase())
                );
            }
            if (isMatch) {
                const tag = interests.length > 0 ? interests[0] : place.category;
                mocks.push({
                    name: place.title,
                    category: place.category,
                    explanation: `Since you enjoy ${tag}, you will love ${place.title}. It stands out as an iconic ${place.category.toLowerCase()} in the city's rich history.`,
                    hybrid_score: 4.5 + Math.random() * 0.5
                });
            }
            if (mocks.length >= 10) break;
        }

        // If no matches, return a couple random ones
        if (mocks.length === 0 && historicalPlaces.length >= 2) {
            mocks.push({
                name: historicalPlaces[0].title,
                category: historicalPlaces[0].category,
                explanation: `Highly recommended due to its timeless significance.`,
                hybrid_score: 4.9
            });
            mocks.push({
                name: historicalPlaces[1].title,
                category: historicalPlaces[1].category,
                explanation: `A breathtaking spot you shouldn't miss.`,
                hybrid_score: 4.7
            });
        }
        
        return mocks;
    }
}
