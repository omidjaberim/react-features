import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SideMenu from "./SideMenu/SideMenu";
import { Suspense } from "react";
import SideMenuMobile from "./SideMenu/SideMenuMobile";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "components";
import { APP_ROUTES } from "constants/enum/app-route.enum";
import UserManagment from "components/icons/userManagment/UserManagment";
import { MdPersonAddAlt1 } from "react-icons/md";

type Anchor = "left" | "right";

const Layout = () => {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "fa-IR";
  const menuItems = [
    { Icon: UserManagment, txt: t("userManagement"), route: APP_ROUTES.ROOT },
    { Icon: MdPersonAddAlt1, txt: t("createUser"), route: APP_ROUTES.CREATE_USER },
  ];

  // const isRtl = i18n.language === "fa-IR";
  // const menuItems = [{ Icon: UserManagment, txt: t("userManagement") }];

  const drawerWidth = 220;
  const [menuState, setMenuState] = React.useState({
    left: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setMenuState({ ...menuState, [anchor]: !menuState[anchor] });
    };

  return (
    <Grid
      className="flex flex-col justify-start items-start w-full"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Navbar
        toggleDrawer={toggleDrawer}
        menuState={menuState}
        anchor={isRtl ? "right" : "left"}
      />
      <div className="flex  justify-center w-full h-full">
        <SideMenu items={menuItems} drawerWidth={drawerWidth} />
        <SideMenuMobile
          items={menuItems}
          drawerWidth={drawerWidth}
          anchor={isRtl ? "right" : "left"}
          toggleDrawer={toggleDrawer}
          menuState={menuState}
        />
        <div className="relative p-4 h-[calc(100vh-4rem)]  w-full ml-0 xl:ml-[220px] rtl:xl:mr-[220px] rtl:ml-0 overflow-y-scroll bg-mainBg">
          <Suspense fallback={<ProgressBar />}>
            {/* TODO ADD LINEAR LOADER */}
            <Outlet />
          </Suspense>
        </div>
      </div>
    </Grid>
  );
};
export default Layout;
