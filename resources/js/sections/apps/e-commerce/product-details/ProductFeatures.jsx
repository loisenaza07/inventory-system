// material-ui
import { Grid, Typography } from '@mui/material';

// ==============================|| PRODUCT DETAILS - FEATURES ||============================== //

function ProductFeatures({product}) {
  return (
    <Grid container spacing={2}>
        <Grid item xs={3}>
        <Typography color="textSecondary">No BMN :</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography textTransform={"capitalize"}>{product.no_bmn}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary">Jenis Barang :</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography textTransform={"capitalize"}>{product.jenis_barang.jenis_barang}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" noWrap>
          Merk :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography textTransform={"capitalize"}>{product.merk}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" textTransform={"capitalize"} noWrap>
          Penanggung Jawab :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography textTransform={"capitalize"}>{product.user.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" noWrap>
          Ruangan :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography textTransform={"capitalize"}>{product.ruangan.nama_ruangan}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary" noWrap>
          Status :
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography noWrap>{product.status}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary">Tahun Pengadaan :</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>{product.tahun_pengadaan}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography color="textSecondary">Nilai Pengadaan :</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>{product.nilai_pengadaan}</Typography>
      </Grid>
    </Grid>
  );
}

export default ProductFeatures;
