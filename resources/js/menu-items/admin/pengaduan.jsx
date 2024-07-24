// third-party
import { FormattedMessage } from "react-intl";

// assets
import { Story, Fatrows, PresentionChart } from "iconsax-react";

// icons
const icons = {
    widgets: Story,
    statistics: Story,
    data: Fatrows,
    chart: PresentionChart,
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const pengaduan = {
    id: "group-pengaduan-admin",
    title: <FormattedMessage id="admin-pengaduan" />,
    icon: icons.widgets,
    type: "group",
    children: [
        {
            id: "daftar-pengaduan-admin",
            title: <FormattedMessage id="daftar-pengaduan" />,
            type: "item",
            url: "/admin/pengaduan/daftar-pengaduan",
            icon: icons.statistics,
        },
    ],
};

export default pengaduan;
