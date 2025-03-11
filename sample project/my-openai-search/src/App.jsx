import React, { useState } from "react";
import axios from "axios";
import backgroundImage from './images/pav.jpg';

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "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"; // 🔴 Replace with your actual OpenAI API key

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
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
      setResult("⚠️ Error fetching AI response.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="search-contain"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1 className="text-white text-4xl mb-8 flex items-center">
        <span role="img" aria-label="search" className="mr-2">🔍</span> AI Search
      </h1>
      
      <div className="w-full max-w-3xl px-4">
        <input
          type="text"
          className="w-full p-6 rounded-full border-none shadow-lg text-black focus:outline-none focus:ring-4 focus:ring-blue-300"
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          style={{
            fontSize: '3em',
            height: 'auto',
            paddingTop: '0.2em',
            paddingBottom: '0.2em'
          }}
        />
        <div className="flex justify-center mt-6 w-full">
          <button
            className="bg-blue-600 text-white px-12 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all font-semibold"
            onClick={handleSearch}
            disabled={loading}
            style={{
              fontSize: '2em',
              minWidth: '180px',
              textAlign: 'center',
              display: 'block',
              margin: '0 auto'
            }}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>
      
      {result && (
        <div className="mt-8 p-6 bg-white bg-opacity-90 shadow-md rounded-lg max-w-2xl w-full mx-4 text-black text-lg">
          <h2 className="text-2xl font-semibold mb-2">AI Response:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}