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
    id: "group-dashboard-user",
    title: <FormattedMessage id="dashboard" />,
    icon: icons.dashboard,
    type: "group",
    children: [
        {
            id: "dashboard",
            title: <FormattedMessage id="dashboard" />,
            type: "item",
            url: "/dashboard",
            icon: icons.dashboard,
        },
    ],
};

export default dashboard;
