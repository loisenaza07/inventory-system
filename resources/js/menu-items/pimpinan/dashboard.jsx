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
    id: "group-dashboard-pimpinan",
    title: <FormattedMessage id="pimpinan-dashboard" />,
    icon: icons.dashboard,
    type: "group",
    children: [
        {
            id: "pimpinan-dashboard",
            title: <FormattedMessage id="dashboard" />,
            type: "item",
            url: "/pimpinan/dashboard",
            icon: icons.dashboard,
        },
    ],
};

export default dashboard;
