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
    id: "group-pengaduan-user",
    title: <FormattedMessage id="pengaduan" />,
    icon: icons.widgets,
    type: "group",
    children: [
        {
            id: "riwayat",
            title: <FormattedMessage id="riwayat-pengaduan" />,
            type: "item",
            url: "/pengaduan/riwayat-pengaduan",
            icon: icons.statistics,
        },
        {
            id: "buat-pengaduan",
            icon: icons.data,
            title: <FormattedMessage id="buat-pengaduan" />,
            type: "item",
            url: "/pengaduan/buat-pengaduan",
        },
    ],
};

export default pengaduan;
