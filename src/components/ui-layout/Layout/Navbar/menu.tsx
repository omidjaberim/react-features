import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useTranslation } from "react-i18next";
import {MdLogout, MdManageAccounts} from 'react-icons/md'

interface IProp {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleLogOut : () => void;
}

const DesktopMenu = (props: IProp) => {
  const { anchorEl, isMenuOpen, handleMenuClose , handleLogOut } = props;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa-IR";


  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={"desktop-menu"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        [`& .MuiList-root`]: { backgroundColor: "#E9EDF7", padding: "0 " },
      }}
      className="mt-12"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <MenuItem
        className="hover:bg-hoverBg border-b border-solid border-borderColor"
        onClick={() => {
          handleMenuClose();
          handleLogOut();
        }}

      >
        <span className="me-3 text-xl text-iconColor">
          <MdLogout />
        </span>
        {t("Exit")}
      </MenuItem>
      <MenuItem
        className="flex justify-start hover:bg-hoverBg border-b border-solid border-borderColor"
        onClick={handleMenuClose}
      >
        <span className="me-3 text-xl text-iconColor">
          <MdManageAccounts />
        </span>
        {t("manageAccount")}
      </MenuItem>
    </Menu>
  );
};

export default DesktopMenu;
