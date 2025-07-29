const FilterInput = ({ gridRef }) => {
  const handleChange = (e) => {
    const value = e.target.value;

    if (gridRef.current && gridRef.current.api) {
      const gridApi = gridRef.current.api;

      if (value.trim() === "") {
        // 🧼 Clear all filters (show original data)
        gridApi.setFilterModel(null);
      } else {
        // 🔍 Apply filtering on 'fname' column
        gridApi.setFilterModel({
          firstname: {
            type: "contains",
            filter: value,
          },
        });
      }

      gridApi.onFilterChanged();
    }
  };

  return (
    <div className="filter__container">
      <input
        type="text"
        placeholder="Filter by First Name"
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FilterInput;
