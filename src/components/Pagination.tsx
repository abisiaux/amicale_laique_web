type PaginationProps = {
  currentPage: number
  pageCount: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex items-center space-x-1 rounded">
        <button
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 enabled:cursor-pointer text-primary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Précédent
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 text-sm border rounded  cursor-pointer ${
              currentPage === page
                ? 'bg-tertiary text-white'
                : 'bg-white text-primary'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 enabled:cursor-pointer text-primary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Suivant &raquo;
        </button>
      </nav>
    </div>
  )
}
