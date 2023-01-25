import { Grid, Menu, MenuItem } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import {
  AddButton,
  FilterButton,
  SearchInput,
  DataGrid,
  Typography,
} from "components";
import { Districts } from "constants/Districts";
import { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserServiceSM } from "services/user/user-sm.service";
import AddUser from "../AddUser/Adduser";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getUsers } from "redux/slices/user";
import { RootState } from "redux/store";
import { UserEntityBaseModel } from "model/entity/user/user.model";
import { IUser } from "model/redux/user";
import { MdMoreVert } from "react-icons/md";
import EditUser from "../EditUser/EditUser";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "constants/enum/app-route.enum";
const Users = () => {
  const navigate = useNavigate();
  const uId = useId();
  const user = new UserServiceSM();
  const dispatch = useAppDispatch();
  const usersList = useAppSelector(
    (store: RootState): IUser[] => store.user.usersList
  );
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await user.getList({ page: 0, size: 20 });
      const list = res.data.map(
        (user: UserEntityBaseModel): IUser => ({
          id: user.id ? user.id : uId,
          fullName: user.firstName + user.lastName,
          phone: user.username,
          province: user.attributes?.region?.toString().split("/")[1],
          userType: user.roles
            .map((role) => (role.description ? role.description : role.name))
            .join(","),
          accessType: "",
          enable: user.enabled,
        })
      );
      dispatch(getUsers(list));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const [idForEdit, setIdForEdit] = useState<string | null>(null);
  const showEdit = (id: string | null) => {
    setIdForEdit(id);
  };
  const handleDeactivation = async (enable: boolean, id: string) => {
    try {
      setLoading(true);
      await user.enableDisableUser({ enable: !enable, id });
      getAllUsers();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const fullName = t("fullName");
  const phone = t("phone");
  const province = t("province");
  const userType = t("userType");
  const accessType = t("accessType");
  const status = t("status");
  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: fullName,
      flex: 1,
      renderCell: ({ value }) => <span className="font-medium">{value}</span>,
    },
    {
      field: "phone",
      headerName: phone,
      flex: 1,
      renderCell: ({ value }) => <span className="font-medium">{value}</span>,
    },
    {
      field: "province",
      headerName: province,
      flex: 0.5,
      renderCell(params) {
        return (
          <span className="font-medium">
            {Districts.find((dist) => dist.code === params.row.province)?.title}
          </span>
        );
      },
    },
    {
      field: "userType",
      headerName: userType,
      flex: 2,
      renderCell: ({ value }) => <span className="font-medium">{value}</span>,
    },
    {
      field: "accessType",
      headerName: accessType,
      flex: 1,
      renderCell: ({ value }) => <span className="font-medium">{value}</span>,
    },
    {
      field: "enable",
      headerName: status,
      flex: 0.5,
      renderCell: (cell) => (
        <span className="font-medium">
          {cell.row.enable ? t("active") : t("deActive")}
        </span>
      ),
    },
    {
      field: "",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState: any) => (
            <>
              <MdMoreVert
                {...bindTrigger(popupState)}
                className="cursor-pointer"
              />
              <Menu {...bindMenu(popupState)} dir="rtl" className="font-sans">
                <MenuItem onClick={() => showEdit(params.row.id)}>
                  <Typography>{t("edit")}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleDeactivation(params.row.enable, params.row.id)
                  }
                >
                  <Typography>{t("deactivation")}</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      ),
    },
  ];

  const [showAddUser, setShowAddUser] = useState(false);
  const addUserModal = (v: boolean) => {
    setShowAddUser(v);
  };
  return (
    <Grid className="flex-col">
      {/* <AddUser
        open={showAddUser}
        handleClose={() => addUserModal(false)}
        refresh={getAllUsers}
      />
      <EditUser
        open={!!idForEdit}
        handleClose={() => showEdit(null)}
        refresh={getAllUsers}
        userId={idForEdit}
      /> */}
      <Grid className="flex flex-col items-center justify-between md:flex-row ">
        <Grid className="flex justify-center items-center my-2">
          <SearchInput classname="me-2" />
          <FilterButton onClick={() => {}} />
        </Grid>
        <AddButton onClick={() => navigate(APP_ROUTES.ADD_USER_PAGE)}>
          {t("addUser")}
        </AddButton>
      </Grid>
      <DataGrid
        loading={loading}
        rows={usersList}
        columns={columns}
        classname="mt-4"
      />
    </Grid>
  );
};
export default Users;
