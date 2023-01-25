// library
import { ForwardedRef, forwardRef } from "react";
// custom
import { dataGridTypes } from "model/etc/data-grid.model";
import cs from "classnames";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridAlignment,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { LinearProgress } from "@mui/material";

const StyledDataGrid: any = styled(DataGrid)(({ theme }) => ({
  border: 0,
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      className="[&>.MuiPagination-ul]:flex [&>.MuiPagination-ul]:flex-row-reverse"
      color="standard"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}

interface IProp {
  classname?: string;
  loading: boolean;
}
const CustomDataGrid = forwardRef(
  (props: dataGridTypes & IProp, ref: ForwardedRef<HTMLDivElement> | null) => {
    const { rows, columns, pageSize, rowsPerPageOptions, classname, loading } =
      props;
    //// disable sort
    const cols = columns.map((cl) => ({
      ...cl,
      sortable: false,
      cellClassName:
        "bg-white2 font-bold border-x border-hoverBg flex justify-center",
      headerClassName:
        "bg-primary text-PureWhite  border-none flex text-center  border-x",
      headerAlign: "center" as GridAlignment,
    }));
    return (
      <StyledDataGrid
        ref={ref}
        rowHeight={40}
        {...props}
        columns={cols}
        rows={rows}
        className={cs(classname, "font-sans")}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        disableIgnoreModificationsIfProcessingProps
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress,
        }}
        autoHeight
        loading={loading}
      />
    );
  }
);

export default CustomDataGrid;
