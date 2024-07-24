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
    id: "group-dashboard-admin",
    title: <FormattedMessage id="admin-dashboard" />,
    icon: icons.dashboard,
    type: "group",
    children: [
        {
            id: "admin-dashboard",
            title: <FormattedMessage id="dashboard" />,
            type: "item",
            url: "/admin/dashboard",
            icon: icons.dashboard,
        },
    ],
};

export default dashboard;
