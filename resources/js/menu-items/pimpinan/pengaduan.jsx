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
    id: "group-pengaduan-pimpinan",
    title: <FormattedMessage id="pimpinan-pengaduan" />,
    icon: icons.widgets,
    type: "group",
    children: [
        {
            id: "riwayat-pengaduan-pimpinan",
            title: <FormattedMessage id="riwayat-pengaduan" />,
            type: "item",
            url: "/pimpinan/pengaduan/riwayat-pengaduan",
            icon: icons.statistics,
        },
    ],
};

export default pengaduan;
