import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
import { themeQuartz } from "ag-grid-community";
import FilterInput from "./FilterInput";

const myTheme = themeQuartz.withParams({
  accentColor: "#0086F4",
  backgroundColor: "#dcd8cbff",
  borderColor: "#91896eff",
  borderRadius: 5,
  browserColorScheme: "light",
  cellHorizontalPaddingScale: 1,
  chromeBackgroundColor: {
    ref: "backgroundColor",
  },
  columnBorder: true,
  fontFamily: {
    googleFont: "Pixelify Sans",
  },
  fontSize: 15,
  foregroundColor: "#605E57",
  headerBackgroundColor: "#ae9885ff",
  headerFontSize: 15,
  headerFontWeight: 700,
  headerTextColor: "#3C3A35",
  rowVerticalPaddingScale: 1,
  spacing: 4,
  wrapperBorderRadius: 5,
});

const EmployeeGrid = ({ rowData, onEdit, onDelete, gridRef }) => {
  const columnDefs = [
    { headerName: "Emp ID", field: "empid", filter: true },
    { headerName: "First Name", field: "firstname", filter: true }, // ✅ Enable filtering here
    { headerName: "Last Name", field: "lastname", filter: true },
    { headerName: "Phone", field: "phone", filter: true },
    { headerName: "Email", field: "email", filter: true },
    { headerName: "Gender", field: "address", filter: true },
    { headerName: "Department", field: "department", filter: true },
    { headerName: "Designation", field: "designation", filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <>
          <button className="btn edit" onClick={() => onEdit(params.data)}>
            Edit
          </button>
          <button
            className="btn delete"
            onClick={() => onDelete(params.data.empid)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <h3 className="title">Employee Data</h3>
      <FilterInput gridRef={gridRef} />
      <div className="ag-theme-alpine grid__table">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          theme={myTheme}
        />
      </div>
    </>
  );
};

export default EmployeeGrid;
