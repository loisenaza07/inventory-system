// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { KyberNetwork, Messages2, Calendar1, Kanban, Profile2User, Bill, UserSquare, ShoppingBag } from 'iconsax-react';

// icons
const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const barang = {
  id: 'group-barang-petugas',
  title: <FormattedMessage id="petugas-barang" />,
  icon: icons.applications,
  type: 'group',
  children: [
    {
      id: 'daftar-barang-petugas',
      title: <FormattedMessage id="daftar-barang" />,
      type: 'item',
      icon: icons.kanban,
      url: '/petugas-layanan/barang/daftar-barang'
    },
  ]
};

export default barang;
