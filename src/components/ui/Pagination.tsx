import styled from "styled-components";
import { theme } from "@/styles/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  getPageNumbers: () => (number | string)[];
  isLoading?: boolean;
}

const PaginationContainer = styled.nav<{ $isLoading?: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid ${theme.colors.border};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  min-height: 70px;
  opacity: ${(props) => (props.$isLoading ? 0.7 : 1)};
  transition: opacity 0.2s ease-in-out;
  pointer-events: ${(props) => (props.$isLoading ? "none" : "auto")};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    gap: ${theme.spacing.xs};
    min-height: 60px;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm} ${theme.spacing.xs};
    gap: 4px;
    min-height: 50px;
  }
`;

const PageButton = styled.button<{
  $isActive?: boolean;
  $isDisabled?: boolean;
  $isLoading?: boolean;
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
  cursor: ${(props) =>
    props.$isLoading || props.$isDisabled ? "not-allowed" : "pointer"};
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  min-width: 44px;
  min-height: 44px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$isActive ? theme.colors.primary : theme.colors.background};
    transform: ${(props) => (props.$isLoading ? "none" : "translateY(-1px)")};
    box-shadow: ${(props) =>
      props.$isLoading ? "none" : "0 2px 8px rgba(0, 0, 0, 0.15)"};
  }

  &:active:not(:disabled) {
    transform: ${(props) => (props.$isLoading ? "none" : "translateY(0)")};
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    min-width: 38px;
    min-height: 38px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    min-width: 32px;
    min-height: 32px;
    font-size: 0.75rem;
    padding: 4px 6px;
  }
`;

const NavigationButton = styled(PageButton)`
  font-size: 1rem;
  min-width: 44px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-width: 38px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    min-width: 32px;
  }
`;

const PageNumbers = styled.div<{ $isLoading?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  justify-content: center;
  transition: opacity 0.2s ease-in-out;

  @media (max-width: 480px) {
    gap: 2px;
    flex: 1;
    overflow-x: auto;
    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const DotsSpan = styled.span`
  padding: ${theme.spacing.sm};
  color: ${theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;

  @media (max-width: 768px) {
    padding: ${theme.spacing.xs};
    min-width: 32px;
  }

  @media (max-width: 480px) {
    padding: 2px 4px;
    min-width: 24px;
    font-size: 0.7rem;
  }
`;

const PageInfo = styled.span<{ $isLoading?: boolean }>`
  color: ${theme.colors.textLight};
  font-size: 0.8rem;
  white-space: nowrap;
  transition: opacity 0.2s ease-in-out;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const PaginationControls = styled.div<{ $isLoading?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  justify-content: center;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    gap: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    gap: 4px;
    width: 100%;
    padding: 0 4px;
  }
`;

const LoadingOverlay = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  display: ${(props) => (props.$show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: opacity 0.2s ease-in-out;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${theme.colors.textLight};
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
    border-width: 1px;
  }
`;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  canGoNext,
  canGoPrev,
  getPageNumbers,
  isLoading = false,
}: PaginationProps) => {
  return (
    <PaginationContainer $isLoading={isLoading}>
      <PaginationControls $isLoading={isLoading}>
        <NavigationButton
          $isDisabled={!canGoPrev || isLoading}
          $isLoading={isLoading}
          disabled={!canGoPrev || isLoading}
          onClick={() => !isLoading && onPageChange(currentPage - 1)}
          title="Previous page"
        >
          ←
        </NavigationButton>

        <PageNumbers $isLoading={isLoading}>
          {getPageNumbers().map((pageNum, index) =>
            pageNum === "..." ? (
              <DotsSpan key={`dots-${index}`}>...</DotsSpan>
            ) : (
              <PageButton
                key={pageNum}
                $isActive={pageNum === currentPage}
                $isLoading={isLoading}
                disabled={isLoading}
                onClick={() => !isLoading && onPageChange(Number(pageNum))}
                title={`Go to page ${pageNum}`}
              >
                {pageNum}
                <LoadingOverlay $show={isLoading && pageNum === currentPage}>
                  <LoadingSpinner />
                </LoadingOverlay>
              </PageButton>
            )
          )}
        </PageNumbers>

        <NavigationButton
          $isDisabled={!canGoNext || isLoading}
          $isLoading={isLoading}
          disabled={!canGoNext || isLoading}
          onClick={() => !isLoading && onPageChange(currentPage + 1)}
          title="Next page"
        >
          →
        </NavigationButton>
      </PaginationControls>

      <PageInfo $isLoading={isLoading}>
        Page {currentPage} of {totalPages}
      </PageInfo>
    </PaginationContainer>
  );
};

export default Pagination;
