import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CustomDataGrid from "components/pure-element/DataGrid/DataGrid";
import { useTranslation } from "react-i18next";
const ReservationSIM = () => {
  const { t } = useTranslation();


  const columns: GridColDef[] = [
    {
      field: "row",
      headerName: t("Row").toString(),
      width: 100,
      align: "center",
      renderCell: ({ value }) => <span className="font-medium">{value}</span>,

    },
    {
      field: "phoneNumber",
      headerName: t("PhoneNumber").toString(),
      width: 400,
      align: "center",
      renderCell: ({ value }) => <span className="font-medium">{value}</span>,

    },
    {
      field: "reservation",
      headerName: "",
      width: 100,
      align: "center",
      renderCell: (params: GridRenderCellParams<Date>) => (
        <strong>
          <button className="hover:bg-primary hover:text-white border-2 font-medium border-primary px-3 py-1 rounded-md transition-all ease-in-out">{t('Reservation')}</button>
        </strong>
      ),
    },
  ];

  const rows = [
    { id: 1, row: 1, phoneNumber: "0901111111111" },
    { id: 2, row: 2, phoneNumber: "0901111111111" },
    { id: 3, row: 3, phoneNumber: "0901111111111" },
    { id: 4, row: 4, phoneNumber: "0901111111111" },
  ];

  return (
    <div>
      <h4 className="text-center my-5 mb-10 font-bold">
        سیمکارت دائمی - طلایی
      </h4>
      <div className="w-[600px] mx-auto">
        <CustomDataGrid rows={rows} columns={columns} pageSize={50} loading />
      </div>
    </div>
  );
};

export default ReservationSIM;
