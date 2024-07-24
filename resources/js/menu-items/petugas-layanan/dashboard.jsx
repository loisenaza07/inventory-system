// third-party
import { FormattedMessage } from "react-intl";

// assets
import { HomeTrendUp } from "iconsax-react";

// icons
const icons = {
    dashboard: HomeTrendUp,
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const dashboard = {
    id: "group-dashboard-petugas",
    title: <FormattedMessage id="petugas-dashboard" />,
    icon: icons.dashboard,
    type: "group",
    children: [
        {
            id: "petugas-dashboard",
            title: <FormattedMessage id="dashboard" />,
            type: "item",
            url: "/petugas/dashboard",
            icon: icons.dashboard,
        },
    ],
};

export default dashboard;
