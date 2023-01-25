import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SvgIconTypeMap,
  Toolbar,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { APP_ROUTES } from "constants/enum/app-route.enum";
import { Link } from "react-router-dom";
import BackgroundImage2 from "assets/img/sidenav4.jpg";

interface IProp {
  drawerWidth: number;
  items: {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    txt: string;
    route: APP_ROUTES;
  }[];
}

const SideMenu = (props: IProp) => {
  const { items, drawerWidth } = props;
  return (
    <Drawer
      variant="permanent"
      className={"z-0 shrink-0 box-border lg:flex md:hidden"}
      sx={{
        with: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box
        className="flex flex-col justify-between h-full bg-white"
        sx={{
          backgroundImage: `url(${BackgroundImage2})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: "0.6",
        }}
      >
        <List>
          {items.map((item, index) => (
            <Link to={item.route} key={`${item.txt}-${index}`}>
              <ListItem key={item.txt} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    px: 2.5,
                  }}
                  className="hover:bg-hoverBg hover:ps-8 hover:text-white transition-all ease-in-out delay-100 border-b border-solid border-borderColor"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      me: 3,
                      justifyContent: "center",
                    }}
                    className="me-3"
                  >
                    <SvgIcon
                      component={item.Icon}
                      inheritViewBox
                      className="text-iconColor"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.txt}
                    className="[&>span]:text-sm"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
export default SideMenu;
