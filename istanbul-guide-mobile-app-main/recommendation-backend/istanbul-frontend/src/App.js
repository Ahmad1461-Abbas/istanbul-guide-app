import React, { useState } from "react";
import axios from "axios";
import RecommendationCard from "./RecommendationCard";

function App() {
  const [interests, setInterests] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/recommend", {
        interests: interests.split(",").map((i) => i.trim())
      });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch recommendations.");
    }
  };

  return (
    <div style={{ padding: "32px", fontFamily: "Arial" }}>
      <h1>Istanbul Recommendations</h1>
      <input
        type="text"
        placeholder="Enter interests: history, food, art"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={fetchRecommendations} style={{ marginLeft: "8px", padding: "8px" }}>
        Get Recommendations
      </button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {recommendations.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;