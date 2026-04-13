const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const ISTANBUL_BBOX = "40.80,28.50,41.35,29.40";

const REQUIRED_PLACES = [
    {
        id: "required-hagia-sophia",
        title: "Hagia Sophia",
        description:
            "One of Istanbul’s most iconic historical landmarks, originally built as a Byzantine cathedral and later converted into a mosque.",
        category: "Mosque",
        period: "Byzantine / Ottoman",
        latitude: 41.0086,
        longitude: 28.9802,
    },
    {
        id: "required-blue-mosque",
        title: "Blue Mosque",
        description:
            "A famous Ottoman imperial mosque known for its six minarets and beautiful blue İznik tiles.",
        category: "Mosque",
        period: "Ottoman",
        latitude: 41.0054,
        longitude: 28.9768,
    },
    {
        id: "required-topkapi-palace",
        title: "Topkapi Palace",
        description:
            "The main residence of the Ottoman sultans for centuries, now a major museum complex.",
        category: "Palace",
        period: "Ottoman",
        latitude: 41.0115,
        longitude: 28.9833,
    },
    {
        id: "required-galata-tower",
        title: "Galata Tower",
        description:
            "A medieval stone tower offering panoramic views of Istanbul and symbolizing the Galata district.",
        category: "Monument",
        period: "Medieval / Ottoman",
        latitude: 41.0256,
        longitude: 28.9741,
    },
    {
        id: "required-basilica-cistern",
        title: "Basilica Cistern",
        description:
            "An ancient underground water reservoir built during the Byzantine era beneath Istanbul.",
        category: "Museum",
        period: "Byzantine",
        latitude: 41.0084,
        longitude: 28.9779,
    },
    {
        id: "required-dolmabahce-palace",
        title: "Dolmabahçe Palace",
        description:
            "A grand 19th-century Ottoman palace on the Bosphorus known for its European-inspired design.",
        category: "Palace",
        period: "Ottoman",
        latitude: 41.0392,
        longitude: 29.0007,
    },
    {
        id: "required-suleymaniye-mosque",
        title: "Süleymaniye Mosque",
        description:
            "A magnificent Ottoman imperial mosque designed by Mimar Sinan, dominating Istanbul’s skyline.",
        category: "Mosque",
        period: "Ottoman",
        latitude: 41.0162,
        longitude: 28.9637,
    },
    {
        id: "required-maiden-tower",
        title: "Maiden’s Tower",
        description:
            "A historic tower on a small islet in the Bosphorus, associated with legends and maritime history.",
        category: "Monument",
        period: "Byzantine / Ottoman",
        latitude: 41.0211,
        longitude: 29.0041,
    },
    {
        id: "required-grand-bazaar",
        title: "Grand Bazaar",
        description:
            "One of the world’s oldest and largest covered markets, central to Istanbul’s trading history.",
        category: "Monument",
        period: "Ottoman",
        latitude: 41.0108,
        longitude: 28.968,
    },
    {
        id: "required-chora-church",
        title: "Chora Church",
        description:
            "A historic Byzantine church famous for its mosaics and frescoes, later converted into a mosque.",
        category: "Museum",
        period: "Byzantine",
        latitude: 41.0322,
        longitude: 28.9394,
    },
];

function getCategory(tags = {}) {
    const name = `${tags.historic || ""} ${tags.tourism || ""} ${tags.building || ""} ${tags.amenity || ""}`.toLowerCase();

    if (name.includes("mosque") || tags.building === "mosque") return "Mosque";
    if (name.includes("palace")) return "Palace";
    if (name.includes("museum") || tags.tourism === "museum") return "Museum";
    if (name.includes("monument") || name.includes("tower") || name.includes("memorial")) {
        return "Monument";
    }
    if (tags.historic) return "Historical Event";

    return "Monument";
}

function getPeriod(tags = {}) {
    const text = `${tags.start_date || ""} ${tags.description || ""} ${tags.name || ""}`.toLowerCase();

    if (text.includes("byzant")) return "Byzantine";
    if (text.includes("ottoman")) return "Ottoman";
    if (text.includes("roman")) return "Roman";
    if (text.includes("medieval")) return "Medieval";

    return "Historical";
}

function getDescription(tags = {}, category) {
    return (
        tags.description ||
        tags["description:en"] ||
        `${tags.name || "This place"} is a historical site in Istanbul categorized as ${category}.`
    );
}

function normalizeElement(element) {
    const tags = element.tags || {};
    const latitude = element.lat ?? element.center?.lat;
    const longitude = element.lon ?? element.center?.lon;

    if (
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        !tags.name
    ) {
        return null;
    }

    const category = getCategory(tags);

    return {
        id: `osm-${element.type}-${element.id}`,
        title: tags.name,
        description: getDescription(tags, category),
        category,
        period: getPeriod(tags),
        latitude,
        longitude,
    };
}

function isUsefulPlace(place) {
    if (!place) return false;
    if (!place.title || !place.latitude || !place.longitude) return false;

    const blacklist = [
        "toilet",
        "bench",
        "atm",
        "parking",
        "restaurant",
        "cafe",
        "hotel",
    ];

    const title = place.title.toLowerCase();
    return !blacklist.some((word) => title.includes(word));
}

function normalizeTitle(title) {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/’/g, "'")
        .trim();
}

function dedupePlaces(places) {
    const seen = new Set();
    const result = [];

    for (const place of places) {
        if (!place) continue;

        const key = normalizeTitle(place.title);
        if (seen.has(key)) continue;

        seen.add(key);
        result.push(place);
    }

    return result;
}

app.get("/health", (_req, res) => {
    res.send("OK");
});

app.get("/api/places", async (_req, res) => {
    try {
        const query = `
[out:json][timeout:30];
(
  node["historic"](${ISTANBUL_BBOX});
  way["historic"](${ISTANBUL_BBOX});
  relation["historic"](${ISTANBUL_BBOX});

  node["tourism"="museum"](${ISTANBUL_BBOX});
  way["tourism"="museum"](${ISTANBUL_BBOX});
  relation["tourism"="museum"](${ISTANBUL_BBOX});

  node["heritage"](${ISTANBUL_BBOX});
  way["heritage"](${ISTANBUL_BBOX});
  relation["heritage"](${ISTANBUL_BBOX});

  node["building"="mosque"](${ISTANBUL_BBOX});
  way["building"="mosque"](${ISTANBUL_BBOX});
  relation["building"="mosque"](${ISTANBUL_BBOX});

  node["amenity"="place_of_worship"]["religion"="muslim"](${ISTANBUL_BBOX});
  way["amenity"="place_of_worship"]["religion"="muslim"](${ISTANBUL_BBOX});
  relation["amenity"="place_of_worship"]["religion"="muslim"](${ISTANBUL_BBOX});
);
out center tags;
    `.trim();

        const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: query,
        });

        if (!response.ok) {
            throw new Error(`Overpass error: ${response.status}`);
        }

        const data = await response.json();

        const livePlaces = (data.elements || [])
            .map(normalizeElement)
            .filter(isUsefulPlace);

        const mergedPlaces = dedupePlaces([
            ...REQUIRED_PLACES,
            ...livePlaces,
        ])
            .sort((a, b) => a.title.localeCompare(b.title))
            .slice(0, 120);

        res.json(mergedPlaces);
    } catch (error) {
        console.error("Overpass failed, returning seeded places only:", error);

        const fallbackPlaces = dedupePlaces([...REQUIRED_PLACES]).sort((a, b) =>
            a.title.localeCompare(b.title)
        );

        res.json(fallbackPlaces);
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Places API running on port ${PORT}`);
});