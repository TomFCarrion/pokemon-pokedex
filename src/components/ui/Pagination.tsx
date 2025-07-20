import styled from "styled-components";
import { theme } from "@/styles/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  getPageNumbers: () => (number | string)[];
}

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing["2xl"]};
  flex-wrap: wrap;
`;

const PageButton = styled.button<{
  $isActive?: boolean;
  $isDisabled?: boolean;
}>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${(props) =>
    props.$isActive
      ? theme.colors.primary
      : props.$isDisabled
      ? theme.colors.background
      : theme.colors.card};
  color: ${(props) =>
    props.$isActive
      ? "white"
      : props.$isDisabled
      ? theme.colors.textLight
      : theme.colors.text};
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  min-width: 40px;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$isActive ? theme.colors.primary : theme.colors.background};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const PageInfo = styled.span`
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  margin: 0 ${theme.spacing.md};
`;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  canGoNext,
  canGoPrev,
  getPageNumbers,
}: PaginationProps) => {
  return (
    <PaginationContainer>
      <PageButton
        $isDisabled={!canGoPrev}
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Previous
      </PageButton>

      {getPageNumbers().map((pageNum, index) =>
        pageNum === "..." ? (
          <span
            key={`dots-${index}`}
            style={{ padding: "0.5rem", color: theme.colors.textLight }}
          >
            ...
          </span>
        ) : (
          <PageButton
            key={pageNum}
            $isActive={pageNum === currentPage}
            onClick={() => onPageChange(Number(pageNum))}
          >
            {pageNum}
          </PageButton>
        )
      )}

      <PageButton
        $isDisabled={!canGoNext}
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </PageButton>

      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>
    </PaginationContainer>
  );
};

export default Pagination;
