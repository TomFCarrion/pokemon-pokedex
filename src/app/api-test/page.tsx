"use client";

import { useState } from "react";
import { testAPI } from "@/lib/api-test";
import { GetPokemonListQuery } from "@/lib/generated/graphql";

export default function ApiTestPage() {
  const [pokemon, setPokemon] = useState<GetPokemonListQuery["pokemon"] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await testAPI();
      setPokemon(data);
      console.log("Success:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "API call failed");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", margin: "0 auto" }}>
      <h1>API Test</h1>

      <button onClick={handleTest}>
        {loading ? "Loading..." : "Test API"}
      </button>

      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      {pokemon && (
        <div>
          <h3>Success! Fetched {pokemon.length} Pokemon</h3>
          <div>
            <pre>{JSON.stringify(pokemon, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
