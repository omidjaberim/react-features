//library
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import {
  MdMenuOpen,
  MdMenu,
  MdOutlineAccountCircle,
  MdOutlineEmail,
  MdOutlineNotificationsActive,
  MdMoreVert,
} from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import { t } from "i18next";
// custom
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./menu";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { logOut, pkceState } from "redux/slices/auth";
import { RootState } from "redux/store";
import { IAuth } from "model/redux/auth";
import { IPkce } from "model/redux/pkce";
import pkceChallenge from "pkce-challenge";

type Anchor = "left" | "right";

interface IProp {
  menuState: {
    left: boolean;
    right: boolean;
  };
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  anchor: Anchor;
}

const CustomNavbar = (props: IProp) => {
  const auth = useAppSelector((store: RootState): IAuth => store.auth);
  const {
    pkce: { code_challenge },
    token: { id_token },
  } = auth;
  const { menuState, toggleDrawer, anchor } = props;
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const changeDir = () => {
    const changhedLng = i18n.language === "fa-IR" ? "en-US" : "fa-IR";
    i18n.changeLanguage(changhedLng);
  };

  const handleLogOut = () => {
    let pkceGenerator: IPkce = { code_challenge: "", code_verifier: "" };
    pkceGenerator = pkceChallenge();
    dispatch(
      pkceState({
        code_challenge: pkceGenerator.code_challenge,
        code_verifier: pkceGenerator.code_verifier,
      })
    );
    const redirect_uri = `${process.env.REACT_APP_AUTH_URL}/realms/smartbss/protocol/openid-connect/auth?response_type=code&client_id=web&scope=openid&redirect_uri=${process.env.REACT_APP_FALLBACK_URL}&code_challenge=${pkceGenerator.code_challenge}&code_challenge_method=S256`;
    const encodedUri = encodeURIComponent(redirect_uri);
    dispatch(logOut());
    window.location.replace(
      `${process.env.REACT_APP_AUTH_URL}/realms/smartbss/protocol/openid-connect/logout?post_logout_redirect_uri=${encodedUri}&id_token_hint=${id_token}`
    );
  };

  return (
    <Box className="flex w-full z-50">
      <AppBar position="static" className="bg-primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            className="xl:hidden md:flex"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            {menuState[anchor] ? <MdMenuOpen /> : <MdMenu />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Dashboard Name
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={t("changeLng")}>
            <IconButton
              onClick={changeDir}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <BiWorld />
            </IconButton>
          </Tooltip>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MdOutlineEmail />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <MdOutlineNotificationsActive />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="desktop-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MdOutlineAccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MdMoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleLogOut={handleLogOut}
      />
      <DesktopMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        isMenuOpen={isMenuOpen}
        handleLogOut={handleLogOut}
      />
    </Box>
  );
};
export default CustomNavbar;
