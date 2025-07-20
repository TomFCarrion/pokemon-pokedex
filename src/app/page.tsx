"use client";

import styled from "styled-components";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { testAPI } from "@/lib/api-test";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { theme } from "@/styles/theme";

interface PokemonData {
  id: number;
  name: string;
  height?: number | null;
  weight?: number | null;
  pokemontypes: Array<{
    type?: { name: string } | null;
  }>;
}

const Container = styled.main`
  width: 100%;
  background: ${theme.colors.background};
  min-height: 100vh;
  padding: 0 ${theme.spacing.lg};

  @media (min-width: 1440px) {
    padding: 0 calc((100vw - 1440px) / 2 + ${theme.spacing.lg});
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing["2xl"]};
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textLight};
  font-size: 1.1rem;
  margin: 0 0 ${theme.spacing.xl} 0;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textLight};
  font-size: 1.1rem;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  color: #dc2626;
  font-size: 1.1rem;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 210px);
  gap: ${theme.spacing.lg};
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, 40vw);
    gap: ${theme.spacing.md};
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

function PokemonApp() {
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon-demo"],
    queryFn: testAPI,
  });

  return (
    <Container>
      <Header>
        <Title>🔍 Pokédex</Title>
        <Subtitle>Discover the world of Pokémon</Subtitle>
      </Header>

      {isLoading && <LoadingText>Loading Pokémon...</LoadingText>}

      {isError && (
        <ErrorText>
          Failed to load Pokémon: {error?.message || "Unknown error"}
        </ErrorText>
      )}

      {pokemon && (
        <PokemonGrid>
          {pokemon.map((poke: PokemonData) => (
            <PokemonCard
              key={poke.id}
              pokemon={{
                ...poke,
                height: poke.height || 0,
                weight: poke.weight || 0,
                pokemontypes: poke.pokemontypes
                  .filter((pt) => pt.type)
                  .map((pt) => ({
                    type: { name: pt.type!.name },
                  })),
              }}
            />
          ))}
        </PokemonGrid>
      )}
    </Container>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonApp />
    </QueryClientProvider>
  );
}
