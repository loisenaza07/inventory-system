import { useMemo } from "react";

// material-ui
import { Box, useMediaQuery } from "@mui/material";

// project-imports
import Search from "./Search";
import Message from "./Message";
import Profile from "./Profile";
import Localization from "./Localization";
import Notification from "./Notification";
import MobileSection from "./MobileSection";

import useConfig from "../../../../hooks/useConfig";
import DrawerHeader from "../../../../Layouts/MainLayout/Drawer/DrawerHeader";
import { MenuOrientation } from "../../../../config";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = ({user, roles}) => {
    const { i18n, menuOrientation } = useConfig();

    const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const localization = useMemo(() => <Localization />, [i18n]);

    return (
        <>
            {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && (
                <DrawerHeader open={true} />
            )}
            {/* {!downLG && <Search />} */}
            <Box sx={{ width: "100%", ml: { xs: 0, md: 2 } }}></Box>
            {/* {!downLG && localization} */}
            <Box></Box>
            {downLG && <Box sx={{ width: "100%", ml: 1 }} />}

            {/* <Notification /> */}
            {/* <Message /> */}
            {!downLG && <Profile user={user} roles={roles} />}
            {downLG && <MobileSection />}
        </>
    );
};

export default HeaderContent;
