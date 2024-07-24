import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, InputAdornment, Menu, MenuItem, Stack, TextField, useMediaQuery } from '@mui/material';

// project-imports
import SortOptions from '@/sections/apps/e-commerce/products/SortOptions';
import MainCard from '@/Components/MainCard';

// assets
import { ArrowDown2, FilterSearch, SearchNormal1 } from 'iconsax-react';

// ==============================|| PRODUCT - HEADER ||============================== //

const ProductsHeader = ({ filter, handleDrawerOpen, setFilter }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // sort options
  const [anchorEl, setAnchorEl] = useState(null);
  const openSort = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // search filter
  const handleSearch = async (event) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString });
  };

  const sortLabel = SortOptions.filter((items) => items.value === filter.sort);

  return (
    <MainCard content={false}>
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        alignItems={matchDownSM ? 'space-between' : 'center'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        sx={{ p: 2 }}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
          <Button onClick={handleDrawerOpen} color="secondary" startIcon={<FilterSearch style={{ color: 'secondary.200' }} />} size="large">
            Filter
          </Button>

          <TextField
            sx={{ '& .MuiOutlinedInput-input': { pl: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchNormal1 size={18} />
                </InputAdornment>
              )
            }}
            value={filter.search}
            placeholder="Cari Barang"
            size="medium"
            onChange={handleSearch}
          />
        </Stack>
      </Stack>
    </MainCard>
  );
};

ProductsHeader.propTypes = {
  handleDrawerOpen: PropTypes.func,
  setFilter: PropTypes.func,
  filter: PropTypes.object
};

export default ProductsHeader;
