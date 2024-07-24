import { useEffect, useLayoutEffect, useState } from "react";

// material-ui
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project-imports
import NavGroup from "./NavGroup";
import menuItemAdmin from "@/menu-items/admin";
import menuItemUser from "@/menu-items/user";
import menuItemPimpinan from "@/menu-items/pimpinan";
import menuItemPetugasLayanan from "@/menu-items/petugas-layanan";

import { useSelector } from "@/store";
import useConfig from "@/hooks/useConfig";
import { HORIZONTAL_MAX_ITEM } from "@/config";
import { MenuOrientation } from "@/config";
import { usePage } from "@inertiajs/react";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = ({ roles }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));
  const { menuOrientation } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);
  const page = usePage().url

  const [selectedItems, setSelectedItems] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [menuItems, setMenuItems] = useState({ items: [] });

  useLayoutEffect(() => {
    // Function to combine menu items based on roles
    const combineMenuItems = () => {
      let combinedItems = [];

      if (roles?.includes("admin")) {
        combinedItems = combinedItems.concat(menuItemAdmin.items);
      }
      if (roles?.includes("user")) {
        combinedItems = combinedItems.concat(menuItemUser.items);
      }
      if (roles?.includes("pimpinan")) {
        combinedItems = combinedItems.concat(menuItemPimpinan.items);
      }
      if (roles?.includes("petugas_layanan")) {
        combinedItems = combinedItems.concat(menuItemPetugasLayanan.items);
      }

      // Remove duplicates if any
      combinedItems = combinedItems.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (t) => t.id === item.id && t.title === item.title && t.type === item.type
          )
      );

      setMenuItems({ items: combinedItems });
    };

    // Call the function to combine menu items
    combineMenuItems();

    console.log(menuItems)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, page]);

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems = [];
  let lastItemId;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items
      .slice(lastItem - 1, menuItems.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
      }));
  }

  const navGroups = menuItems.items
    .slice(0, lastItemIndex + 1)
    .map((item) => {
      switch (item.type) {
        case "group":
          return (
            <NavGroup
              key={item.id}
              setSelectedItems={setSelectedItems}
              setSelectedLevel={setSelectedLevel}
              selectedLevel={selectedLevel}
              selectedItems={selectedItems}
              lastItem={lastItem}
              remItems={remItems}
              lastItemId={lastItemId}
              item={item}
            />
          );
        default:
          return (
            <Typography
              key={item.id}
              variant="h6"
              color="error"
              align="center"
            >
              Fix - Navigation Group
            </Typography>
          );
      }
    });

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        "& > ul:first-of-type": { mt: 0 },
        display: isHorizontal ? { xs: "block", lg: "flex" } : "block",
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
