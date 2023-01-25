import { ForwardedRef } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

export interface dataGridTypes {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
  checkboxSelection?: boolean;
  rowsPerPageOptions?: [number];
  disableSelectionOnClick?: boolean;
}
