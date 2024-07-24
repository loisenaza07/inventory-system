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
    id: "group-pengaduan-petugas",
    title: <FormattedMessage id="petugas-pengaduan" />,
    icon: icons.widgets,
    type: "group",
    children: [
        {
            id: "daftar-petugas",
            title: <FormattedMessage id="daftar-pengaduan" />,
            type: "item",
            url: "/petugas/pengaduan/daftar-pengaduan",
            icon: icons.statistics,
        },
        // {
        //     id: "buat-pengaduan-petugas",
        //     icon: icons.data,
        //     title: <FormattedMessage id="buat-pengaduan" />,
        //     type: "item",
        //     url: "/petugas/pengaduan/buat-pengaduan",
        // },
    ],
};

export default pengaduan;
