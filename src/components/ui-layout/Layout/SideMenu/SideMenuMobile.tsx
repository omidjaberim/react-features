import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SvgIconTypeMap,
  SwipeableDrawer,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

import BackgroundImage2 from "assets/img/sidenav4.jpg";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "constants/enum/app-route.enum";

type Anchor = "left" | "right";
interface IProp {
  items: {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    txt: string;
    route: APP_ROUTES;
  }[];
  drawerWidth: number;
  anchor: Anchor;
  menuState: {
    left: boolean;
    right: boolean;
  };
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const SideMenuMobile = (props: IProp) => {
  const { items, drawerWidth, anchor, menuState, toggleDrawer } = props;
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: drawerWidth, backgroundImage: `url(${BackgroundImage2})` }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      role="presentation"
      dir={anchor}
      className="bg-white h-full"
    >
      <Box className="flex flex-col justify-between h-full">
        <List>
          {items.map((item, index) => (
            <Link to={item.route} key={`${item.txt}-${index}`}>
              <ListItem
                key={item.txt}
                disablePadding
                className="hover:bg-hoverBg border-b border-solid border-borderColor"
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                    className="text-iconColor me-3"
                  >
                    <SvgIcon component={item.Icon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={item.txt} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={menuState[anchor]}
      onClose={toggleDrawer(anchor, false)}
      onOpen={toggleDrawer(anchor, true)}
      sx={{
        "& .MuiPaper-root": {
          direction: "ltr",
          width: drawerWidth,
          overflow: "hidden",
        },
        "& div.muirtl-1160xiw-MuiPaper-root-MuiDrawer-paper": {
          right: window.innerWidth - drawerWidth,
        },
      }}
      className="overflow-hidden"
    >
      {list(anchor)}
    </SwipeableDrawer>
  );
};
export default SideMenuMobile;
