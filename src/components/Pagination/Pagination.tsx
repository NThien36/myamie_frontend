import Button from "../Buttons/Button";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({
  currentPage = 1,
  totalPage = 1,
  onPageChange,
  className = "mt-20",
}: PaginationProps) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center gap-4 w-fit mx-auto ${className}`}>
      <Button
        id="pagination-previous"
        variant="ghost"
        padding="px-3 py-1.5"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </Button>
      <p>
        {currentPage} / {totalPage}
      </p>
      <Button
        id="pagination-next"
        variant="ghost"
        padding="px-3 py-1.5"
        onClick={handleNextPage}
        disabled={currentPage === totalPage || totalPage === 0}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </Button>
    </div>
  );
}

export default Pagination;
