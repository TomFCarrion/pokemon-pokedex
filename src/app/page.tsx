"use client";

import styled from "styled-components";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getPokemonPage, searchPokemon } from "@/lib/api-test";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import Pagination from "@/components/ui/Pagination";
import usePagination from "@/hooks/usePagination";
import SearchBar from "@/components/ui/SearchBar";
import useSortPersistence, { SortField } from "@/hooks/useSortPersistence";
import { theme } from "@/styles/theme";
import { useCallback, useState } from "react";
import { SortControls } from "@/components/ui/SortControls";

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

const SearchResults = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.textLight};
  width: 100%;
  font-size: 0.9rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textLight};
  font-size: 1.1rem;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

const PokemonApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pagination = usePagination(151, 20);

  const { sortField, sortOrder, toggleSort, getGraphQLOrderBy } =
    useSortPersistence();

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term !== searchTerm) {
        pagination.goToPage(1);
      }
    },
    [searchTerm, pagination]
  );

  const handleSort = useCallback(
    (field: SortField) => {
      toggleSort(field);
      pagination.goToPage(1); // Reset to page 1 when sorting changes
    },
    [toggleSort, pagination]
  );
  const searchQuery = useQuery({
    queryKey: ["pokemon-search", searchTerm, sortField, sortOrder],
    queryFn: () => searchPokemon(searchTerm, getGraphQLOrderBy()),
    enabled: !!searchTerm.trim(),
  });

  const paginationQuery = useQuery({
    queryKey: ["pokemon-page", pagination.currentPage, sortField, sortOrder],
    queryFn: () =>
      getPokemonPage(pagination.currentPage, 20, getGraphQLOrderBy()),
    enabled: !searchTerm.trim(),
  });

  const isSearching = !!searchTerm.trim();
  const activeQuery = isSearching ? searchQuery : paginationQuery;
  const { data: pokemonData, isLoading, isError, error } = activeQuery;

  return (
    <Container>
      <Header>
        <Title>🔍 Pokédex</Title>
      </Header>

      <ControlsContainer>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by name or number..."
          isLoading={isLoading}
        />
        <SortControls
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </ControlsContainer>

      {isSearching && pokemonData && (
        <SearchResults>
          {pokemonData.totalItems === 0
            ? `No results for "${searchTerm}"`
            : `Found ${pokemonData.totalItems} Pokémon matching "${searchTerm}"`}
        </SearchResults>
      )}

      {pokemonData && pokemonData.pokemon.length === 0 && !isLoading && (
        <NoResults>
          {isSearching
            ? `No Pokémon found matching "${searchTerm}". Try searching for "pikachu" or "25"!`
            : "No Pokémon found."}
        </NoResults>
      )}

      {isLoading && <LoadingText>Loading Pokémon...</LoadingText>}

      {isError && (
        <ErrorText>
          Failed to load Pokémon: {error?.message || "Unknown error"}
        </ErrorText>
      )}

      {pokemonData && (
        <>
          <PokemonGrid style={{ opacity: 1 }}>
            {pokemonData.pokemon.map((poke: PokemonData) => (
              <PokemonCard
                key={poke.id}
                pokemon={{
                  ...poke,
                  height: poke.height || 0,
                  weight: poke.weight || 0,
                  pokemontypes: poke.pokemontypes.map((pt) => ({
                    type: { name: pt.type?.name || "" },
                  })),
                }}
              />
            ))}
          </PokemonGrid>

          {!isSearching && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.goToPage}
              canGoNext={pagination.canGoNext}
              canGoPrev={pagination.canGoPrev}
              getPageNumbers={pagination.getPageNumbers}
            />
          )}
        </>
      )}
    </Container>
  );
};

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonApp />
    </QueryClientProvider>
  );
};

export default Home;
