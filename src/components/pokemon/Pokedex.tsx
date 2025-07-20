"use client";

import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPokemonPage, searchPokemon } from "@/lib/api-test";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import Pagination from "@/components/ui/Pagination";
import usePagination from "@/hooks/usePagination";
import SearchAndSort from "@/components/ui/SearchBar";
import useSortPersistence, { SortField } from "@/hooks/useSortPersistence";
import { theme } from "@/styles/theme";
import { useCallback, useState } from "react";
import { PokeballIcon } from "@/components/pokemon/PokemonCard";

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
  position: relative;
  width: 100%;
  height: 100vh;
  background: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PokeballBackground = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  color: black;
  opacity: 0.05;
  transform: scale(10);
  z-index: 0;
  pointer-events: none;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: ${theme.spacing.md} ${theme.spacing.md} 0;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm} ${theme.spacing.sm} 0;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  margin: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    margin-top: ${theme.spacing.md};
    font-size: 1.5rem;
  }
`;

const ControlsContainer = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: ${theme.spacing.lg};
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: 0 ${theme.spacing.sm};
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textLight};
  }
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
  padding-bottom: ${theme.spacing.xl};

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
  padding-top: ${theme.spacing.md};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textLight};
  font-size: 1.1rem;
`;

const Pokedex = () => {
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
      <PokeballBackground>
        <PokeballIcon />
      </PokeballBackground>

      <Header>
        <Title>Pokédex</Title>
      </Header>

      <ControlsContainer>
        <SearchAndSort
          onSearch={handleSearch}
          onSort={handleSort}
          placeholder="Search by name or number..."
          isLoading={isLoading}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </ControlsContainer>

      <ContentArea>
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
          <PokemonGrid
            style={{
              opacity: isLoading ? 0.6 : 1,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
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
        )}
      </ContentArea>

      {!isSearching && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          canGoNext={pagination.canGoNext}
          canGoPrev={pagination.canGoPrev}
          getPageNumbers={pagination.getPageNumbers}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
};

export default Pokedex;
