import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdLogout, MdManageAccounts } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface IProp {
  mobileMoreAnchorEl: null | HTMLElement;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleLogOut: () => void;
}

const MobileMenu = (props: IProp) => {
  const {
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    handleProfileMenuOpen,
    handleMobileMenuClose,
    handleLogOut,
  } = props;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa-IR";
  return (
    <Menu
      dir={isRtl ? "rtl" : "ltr"}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id={"navbar-phone"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        className="hover:bg-hoverBg border-b border-solid border-borderColor"
        onClick={() => {
          handleMobileMenuClose();
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
        onClick={handleMobileMenuClose}
      >
        <span className="me-3 text-xl text-iconColor">
          <MdManageAccounts />
        </span>
        {t("manageAccount")}
      </MenuItem>
    </Menu>
  );
};
export default MobileMenu;
