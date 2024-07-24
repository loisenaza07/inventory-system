import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Drawer, Stack, useMediaQuery } from '@mui/material';

// project-imports
import ProductFilterView from './ProductFilterView';
import ProductFilter from './ProductFilter';
import MainCard from '@/Components/MainCard';
import SimpleBar from '@/Components/third-party/SimpleBar';
import useConfig from '@/hooks/useConfig';
import { HEADER_HEIGHT } from '@/config';
import { ThemeMode } from '@/config';

// ==============================|| PRODUCT - FILTER DRAWER ||============================== //

function ProductFilterDrawer({ filter, initialState, handleDrawerOpen, openFilterDrawer, setFilter, setLoading }) {
  const theme = useTheme();

  const { container } = useConfig();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchLG = useMediaQuery(theme.breakpoints.only('lg'));
  const drawerBG = theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'white';

  const filterIsEqual = (a1, a2) =>
    a1 === a2 ||
    (a1.length === a2.length &&
      a1.search === a2.search &&
      a1.sort === a2.sort &&
      a1.price === a2.price &&
      a1.rating === a2.rating &&
      JSON.stringify(a1.status) === JSON.stringify(a2.status) &&
      JSON.stringify(a1.jenis_barang) === JSON.stringify(a2.jenis_barang) &&
      JSON.stringify(a1.colors) === JSON.stringify(a2.colors));

  const handelFilter = (type, params, rating) => {
    setLoading(true);
    switch (type) {
        case 'search':
          setFilter({ ...filter, search: params });
          break;
          case 'status':
              if (filter.status.some((item) => item === params)) {
                  setFilter({ ...filter, status: filter.status.filter((item) => item !== params) });
                } else {
                    setFilter({ ...filter, status: [...filter.status, params] });
                }
        break;
        case 'jenis_barang':
            if (filter.jenis_barang.some((item) => item === params)) {
                setFilter({ ...filter, jenis_barang: filter.jenis_barang.filter((item) => item !== params) });
        } else if (filter.jenis_barang.some((item) => item === 'all') || params === 'all') {
            setFilter({ ...filter, jenis_barang: [params] });
        } else {
            setFilter({ ...filter, jenis_barang: [...filter.jenis_barang, params] });
        }
        break;
        default:
      // no options
    }
  };

  const drawerContent = (
    <Stack sx={{ p: 3 }} spacing={0.5}>
      <ProductFilterView filter={filter} filterIsEqual={filterIsEqual} handelFilter={handelFilter} initialState={initialState} />
      <ProductFilter filter={filter} handelFilter={handelFilter} />
    </Stack>
  );

  return (
    <Drawer
      sx={{
        width: container && matchLG ? 240 : 320,
        flexShrink: 0,
        zIndex: { xs: 1200, lg: 0 },
        mr: openFilterDrawer && !matchDownLG ? 2.5 : 0,
        '& .MuiDrawer-paper': {
          height: matchDownLG ? '100%' : 'auto',
          width: container && matchLG ? 240 : 320,
          boxSizing: 'border-box',
          position: 'relative',
          boxShadow: 'none'
        }
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openFilterDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard
        title="Filter"
        sx={{
          bgcolor: matchDownLG ? 'transparent' : drawerBG,
          borderRadius: '4px 0 0 4px',
          borderRight: 'none'
        }}
        border={!matchDownLG}
        content={false}
      >
        {matchDownLG && <SimpleBar sx={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>{drawerContent}</SimpleBar>}
        {!matchDownLG && drawerContent}
      </MainCard>
    </Drawer>
  );
}

ProductFilterDrawer.propTypes = {
  filter: PropTypes.object,
  initialState: PropTypes.object,
  handleDrawerOpen: PropTypes.func,
  openFilterDrawer: PropTypes.bool,
  setFilter: PropTypes.func,
  setLoading: PropTypes.func
};

export default ProductFilterDrawer;
