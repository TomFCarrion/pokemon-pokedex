"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SortField, SortOrder } from "@/hooks/useSortPersistence";

interface SortControlsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const SortContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const SortLabel = styled.span`
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  margin-right: ${theme.spacing.sm};
`;

const SortButton = styled.button<{ $isActive: boolean; $order?: SortOrder }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid
    ${(props) => (props.$isActive ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  background: ${(props) =>
    props.$isActive ? theme.colors.primary : theme.colors.card};
  color: ${(props) => (props.$isActive ? "white" : theme.colors.text)};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background: ${(props) =>
      props.$isActive ? theme.colors.primary : theme.colors.background};
    transform: translateY(-1px);
  }
`;

const SortIcon = styled.span<{ $order: SortOrder }>`
  font-size: 0.8rem;
  opacity: 0.8;
  transform: ${(props) =>
    props.$order === "desc" ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.2s ease-in-out;
`;

const sortOptions: { field: SortField; label: string }[] = [
  { field: "id", label: "Number" },
  { field: "name", label: "Name" },
];

export function SortControls({
  sortField,
  sortOrder,
  onSort,
}: SortControlsProps) {
  return (
    <SortContainer>
      <SortLabel>Sort by:</SortLabel>
      {sortOptions.map((option) => (
        <SortButton
          key={option.field}
          $isActive={sortField === option.field}
          onClick={() => onSort(option.field)}
        >
          {option.label}
          {sortField === option.field && (
            <SortIcon $order={sortOrder}>↑</SortIcon>
          )}
        </SortButton>
      ))}
    </SortContainer>
  );
}
