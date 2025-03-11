import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "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"; // Replace with your API key

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty queries

    setLoading(true);
    setResult(""); // Clear previous result

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: query }],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setResult(response.data.choices[0].message.content);
    } catch (error) {
      setResult("Error fetching response. Check API key and try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">🔍 AI Search</h1>

      <div className="relative w-full max-w-lg">
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-2">AI Response:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
