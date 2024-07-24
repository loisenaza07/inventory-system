import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Chip, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project-imports
import ColorOptions from './ColorOptions';
import IconButton from '@/Components/@extended/IconButton';

// assets
import { Add } from 'iconsax-react';

function getColor(color) {
  return ColorOptions.filter((item) => item.value === color);
}

// ==============================|| PRODUCT - FILTER VIEW ||============================== //

const ProductFilterView = ({ filter, filterIsEqual, handelFilter, initialState }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!filterIsEqual(initialState, filter) && (
        <Stack spacing={2}>
          <Typography variant="h5">Active Filters</Typography>
          {!(initialState.search === filter.search) && (
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip
                  size={matchDownMD ? 'small' : undefined}
                  label={filter.search}
                  sx={{
                    borderRadius: '4px',
                    textTransform: 'capitalize',
                    color: 'secondary.main',
                    bgcolor: 'inherit',
                    '& .MuiSvgIcon-root': { color: `grey` }
                  }}
                />
                <IconButton
                  color="secondary"
                  size="small"
                  sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                  onClick={() => handelFilter('search', '')}
                >
                  <Add style={{ transform: 'rotate(45deg)' }} />
                </IconButton>
              </Stack>
            </Grid>
          )}
         
          {!(JSON.stringify(initialState.status) === JSON.stringify(filter.status)) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">status</Typography>
                <Grid container item sx={{ ml: '-10px' }}>
                  {filter.status.map((item, index) => (
                    <Stack direction="row" alignItems="center" key={index}>
                      <Chip
                        size={matchDownMD ? 'small' : undefined}
                        label={item}
                        sx={{
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          color: 'secondary.main',
                          bgcolor: 'inherit',
                          '& .MuiSvgIcon-root': { color: `grey` }
                        }}
                      />
                      <IconButton
                        color="secondary"
                        size="small"
                        sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                        onClick={() => handelFilter('status', item)}
                      >
                        <Add style={{ transform: 'rotate(45deg)' }} />
                      </IconButton>
                    </Stack>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          )}
          {!(JSON.stringify(initialState.jenis_barang) === JSON.stringify(filter.jenis_barang)) && filter.jenis_barang.length > 0 && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">jenis_barang</Typography>
                <Grid container item sx={{ ml: '-10px' }}>
                  {filter.jenis_barang.map((item, index) => (
                    <Stack direction="row" alignItems="center" key={index}>
                      <Chip
                        size={matchDownMD ? 'small' : undefined}
                        label={item}
                        sx={{
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          color: 'secondary.main',
                          bgcolor: 'inherit',
                          '& .MuiSvgIcon-root': { color: `grey` }
                        }}
                      />
                      <IconButton
                        color="secondary"
                        size="small"
                        sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                        onClick={() => handelFilter('jenis_barang', item)}
                      >
                        <Add style={{ transform: 'rotate(45deg)' }} />
                      </IconButton>
                    </Stack>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          )}
          
          <Grid item>
            <Button variant="text" color="primary" sx={{ ml: '-10px' }} onClick={() => handelFilter('reset', '')}>
              Reset all filters
            </Button>
          </Grid>
          <Grid item>
            <Divider sx={{ ml: '-8%', mr: '-8%' }} />
          </Grid>
        </Stack>
      )}
    </>
  );
};

ProductFilterView.propTypes = {
  filter: PropTypes.object,
  filterIsEqual: PropTypes.func,
  initialState: PropTypes.object,
  handelFilter: PropTypes.func
};

export default ProductFilterView;
