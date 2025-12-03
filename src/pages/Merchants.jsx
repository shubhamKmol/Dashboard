import { useMemo, useState, useEffect } from "react";
import { Button } from "flowbite-react";
import MerchantFilters from "../components/merchants/MerchantFilters";
import MerchantTable from "../components/merchants/MerchantTable";
import MerchantDetailModal from "../components/merchants/MerchantDetailModal";
import MerchantForm from "../components/merchants/MerchantForm";

export default function Merchants({
  merchants,
  isLoading,
  addMerchant,
  updateMerchant,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [risk, setRisk] = useState("all");
  const [sortField, setSortField] = useState("monthlyVolume");
  const [sortDirection, setSortDirection] = useState("desc");

  // detail modal state
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // add/edit form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [formInitialValues, setFormInitialValues] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, risk, sortField, sortDirection]);

  // Filter + sort
  const filteredMerchants = useMemo(() => {
    let result = merchants || [];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((m) => m.name.toLowerCase().includes(q));
    }

    if (status !== "all") {
      result = result.filter((m) => m.status === status);
    }

    if (risk !== "all") {
      result = result.filter((m) => m.riskLevel === risk);
    }

    result = [...result].sort((a, b) => {
      const field = sortField;
      const av = a[field];
      const bv = b[field];

      if (typeof av === "number" && typeof bv === "number") {
        return sortDirection === "asc" ? av - bv : bv - av;
      }
      return 0;
    });

    return result;
  }, [merchants, search, status, risk, sortField, sortDirection]);

  // Pagination calculations
  const totalItems = filteredMerchants.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage =
    currentPage > totalPages ? totalPages : currentPage;
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMerchants = filteredMerchants.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // Handlers
  const handleRowClick = (merchant) => {
    setSelectedMerchant(merchant);
    setIsDetailOpen(true);
  };

  const handleAddClick = () => {
    setFormMode("add");
    setFormInitialValues(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (values) => {
    if (formMode === "add") {
      addMerchant(values);
    } else if (formMode === "edit" && values.id) {
      updateMerchant(values.id, values);
    }
    setIsFormOpen(false);
  };

  const handleEditFromDetail = (merchant) => {
    setFormMode("edit");
    setFormInitialValues(merchant);
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            {/* <h1 className="text-xl font-semibold text-slate-800">Merchants</h1> */}
            {/* <p className="text-sm text-slate-500"> */}
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Merchants
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">

              Search, filter and review merchant performance.
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleAddClick}
            color="light"
            // pill
            className="px-4 font-medium"
          >
            + Add merchant
          </Button>

        </div>

        <MerchantFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          risk={risk}
          onRiskChange={setRisk}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortFieldChange={setSortField}
          onSortDirectionToggle={() =>
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        />

        <MerchantTable
          merchants={paginatedMerchants}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />

        {/* Pagination footer */}
        {!isLoading && totalItems > 0 && (
          <div className="mt-4 flex flex-col gap-2 items-center justify-between md:flex-row text-sm text-slate-600 dark:text-slate-300">
            <span>
              Showing{" "}
              <span className="font-medium">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(endIndex, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {totalItems}
              </span>{" "}
              merchants
            </span>

            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={safeCurrentPage === 1}
                className={`px-3 py-1 rounded border text-xs font-medium ${safeCurrentPage === 1
                  ? "text-slate-400 border-slate-200 cursor-not-allowed"
                  : "text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
              >
                 {"<"}
              </button>
              <span>
                Page{" "}
                <span className="font-semibold">{safeCurrentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={safeCurrentPage === totalPages}
                className={`px-3 py-1 rounded border text-xs font-medium ${safeCurrentPage === totalPages
                  ? "text-slate-400 border-slate-200 cursor-not-allowed"
                  : "text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
              >
                {">"}
              </button>
            </div>
          </div>
        )}

        {/* Detail modal */}

      </div>
      <MerchantDetailModal
        open={isDetailOpen}
        merchant={selectedMerchant}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={updateMerchant}
        onEdit={handleEditFromDetail}
      />

      {/* Add/Edit form modal */}
      <MerchantForm
        open={isFormOpen}
        mode={formMode}
        initialValues={formInitialValues}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
