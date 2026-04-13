import React from "react";

export default function RecommendationCard({ item }) {
  return (
    <div style={styles.card}>
      <img src={item.image_url} alt={item.name} style={styles.image} />
      <h2>{item.name}</h2>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Rating:</strong> {item.rating} ⭐</p>
      <p><strong>Tags:</strong> {item.tags.join(", ")}</p>
      <p>{item.llm_explanation}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};