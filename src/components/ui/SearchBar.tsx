"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto ${theme.spacing.xl} auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  background: ${theme.colors.card};
  color: ${theme.colors.text};
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.textLight};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textLight};
  font-size: 1.2rem;
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.textLight};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.text};
  }
`;

const SearchBar = ({
  onSearch,
  placeholder = "Search Pokémon...",
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm ? (
        <ClearButton onClick={handleClear} title="Clear search">
          ✕
        </ClearButton>
      ) : (
        <SearchIcon>🔍</SearchIcon>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
