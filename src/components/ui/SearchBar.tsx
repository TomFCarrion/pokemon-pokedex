"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SortField, SortOrder } from "@/hooks/useSortPersistence";

interface SearchAndSortProps {
  onSearch: (term: string) => void;
  onSort: (field: SortField) => void;
  placeholder?: string;
  isLoading?: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${theme.colors.card};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  transition: border-color 0.2s ease-in-out;

  &:focus-within {
    border-color: ${theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  background: transparent;
  font-size: 1rem;
  color: ${theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${theme.colors.textLight};
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background: ${theme.colors.border};
  margin: 0 ${theme.spacing.sm};

  @media (max-width: 480px) {
    margin: 0 ${theme.spacing.xs};
  }
`;

const SortLabel = styled.span`
  color: ${theme.colors.textLight};
  font-size: 0.85rem;
  margin-right: ${theme.spacing.xs};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const SortSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${theme.spacing.sm};

  @media (max-width: 480px) {
    margin-right: ${theme.spacing.xs};
  }
`;

const SortDropdown = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background: transparent;
  color: ${theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right ${theme.spacing.sm} center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: ${theme.spacing.xl};
  min-width: 120px;

  &:hover {
    background-color: ${theme.colors.background};
  }

  option {
    background: ${theme.colors.card};
    color: ${theme.colors.text};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    min-width: 100px;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    padding-right: ${theme.spacing.lg};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    min-width: 80px;
    padding-right: ${theme.spacing.md};
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textLight};
  cursor: pointer;
  font-size: 1.2rem;
  padding: ${theme.spacing.sm};
  margin-right: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.xs};
    margin-right: ${theme.spacing.xs};
    font-size: 1rem;
  }
`;

const SortInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.sm};
  gap: ${theme.spacing.md};
  color: ${theme.colors.textLight};
  font-size: 0.85rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: ${theme.spacing.sm};
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    gap: ${theme.spacing.xs};
  }
`;

const SortToggle = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 4px ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 2px 4px;
  }
`;

const SortIcon = styled.span<{ $order: SortOrder }>`
  font-size: 0.8rem;
  transform: ${(props) =>
    props.$order === "desc" ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.2s ease-in-out;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const sortOptions = [
  { value: "id", label: "Number" },
  { value: "name", label: "Name" },
];

const SearchAndSort = ({
  onSearch,
  onSort,
  placeholder = "Search by name or number...",
  isLoading = false,
  sortField,
  sortOrder,
}: SearchAndSortProps) => {
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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value as SortField);
  };

  const toggleSortOrder = () => {
    onSort(sortField);
  };

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortField)?.label || "Number";

  return (
    <SearchContainer>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />

        {searchTerm && (
          <ActionButton onClick={handleClear} title="Clear search">
            ✕
          </ActionButton>
        )}

        <Separator />

        <SortSection>
          <SortLabel>Sort by:</SortLabel>
          <SortDropdown
            value={sortField}
            onChange={handleSortChange}
            disabled={isLoading}
            title="Sort by"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SortDropdown>
        </SortSection>
      </SearchInputContainer>

      <SortInfo>
        <span>Sorted by {currentSortLabel}</span>
        <SortToggle
          onClick={toggleSortOrder}
          title={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
        >
          {sortOrder === "asc" ? "A-Z" : "Z-A"}
          <SortIcon $order={sortOrder}>↑</SortIcon>
        </SortToggle>
      </SortInfo>
    </SearchContainer>
  );
};

export default SearchAndSort;
