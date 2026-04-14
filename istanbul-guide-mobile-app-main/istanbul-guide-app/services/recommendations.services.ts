import { historicalPlaces } from "../constants/historicalPlaces";

export interface RecommendationResult {
    name: string;
    category: string;
    explanation: string;
    hybrid_score: number;
}

const GEMINI_API_KEY = "AIzaSyCaddkY1fxvjTeL4p11TPxxqpSdXBg6IcE";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function getRecommendations(interests: string[]): Promise<RecommendationResult[]> {
    try {
        const placesContext = historicalPlaces.map(p => `- ${p.title} (${p.category}): ${p.description}`).join("\n");
        const userInterests = interests.length > 0 ? interests.join(", ") : "general tourism, landmarks, popular spots";
        
        const prompt = `You are a local Istanbul guide. Your task is to recommend up to 10 places from the provided list based on the user's interests.

Places List:
${placesContext}

User Interests: ${userInterests}

Please return the results STRICTLY as a JSON array of objects. Do not use any markdown formatting like \`\`\`json. Each object MUST have the following structure:
- "name": string (Must exactly match the title of the place from the Places List)
- "category": string (The category of the place)
- "explanation": string (A short, 1-2 sentence engaging explanation of why this place matches their specific interests)
- "hybrid_score": number (A score between 0.0 and 5.0 indicating how well it matches)
`;

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch recommendations from Gemini: ${response.status}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!candidate) {
             throw new Error("No valid response from Gemini");
        }
        
        const jsonText = candidate.replace(/```json\n?|```/g, '').trim();
        const parsedRecommendations: RecommendationResult[] = JSON.parse(jsonText);
        
        return parsedRecommendations;
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
