import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Loader from "@/Components/Loader";
import ProductCard from "@/Components/cards/e-commerce/admin/ProductCard";
import ProductFilterDrawer from "@/sections/apps/e-commerce/products/ProductFilterDrawer";
import SkeletonProductPlaceholder from "@/Components/cards/skeleton/ProductPlaceholder";
import ProductsHeader from "@/sections/apps/e-commerce/products/ProductsHeader";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import useConfig from "@/hooks/useConfig";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "container",
})(({ theme, open, container }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter,
  }),
  marginLeft: -320,
  ...(container && {
    [theme.breakpoints.only("lg")]: {
      marginLeft: !open ? -240 : 0,
    },
  }),
  [theme.breakpoints.down("lg")]: {
    paddingLeft: 0,
    marginLeft: 0,
  },
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter,
    }),
    marginLeft: 0,
  }),
}));

const DaftarBarang = (props) => {
  const theme = useTheme();
  const { container } = useConfig();
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const [filter, setFilter] = useState({
    search: "",
    status: ["all"],
    jenis_barang: ["all"],
  });

  useEffect(() => {
    setProducts(props.barang || []);
    setLoading(false);
  }, [props.barang]);

  useEffect(() => {
    // Simulate fetching filtered data
    setProductLoading(false);
  }, [filter]);

  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  const productResult = products.length > 0 ? (
    products.map((product, index) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <ProductCard
          id={Number(product.id)} // Ensure id is a number
          image={product.gambar && product.gambar[0] ? product.gambar[0].path : ""}
          name={product.nama_barang}
          brand={product.jenis_barang?.jenis_barang}
          offer={product.offer}
          description={product.description}
          offerPrice={product.nilai_pengadaan}
          salePrice={product.salePrice}
          rating={product.rating}
          color={product.colors ? product.colors[0] : undefined}
          open={openFilterDrawer}
        />
      </Grid>
    ))
  ) : (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Typography variant="h6">No Data</Typography>
    </Box>
  );

  if (loading) return <Loader />;

  return (
    <MainLayout roles={props.auth.roles} user={props.auth.user}>
      <Head title="Daftar Barang" />
      <Box sx={{ display: "flex" }}>
        <ProductFilterDrawer
          filter={filter}
          setFilter={setFilter}
          openFilterDrawer={openFilterDrawer}
          handleDrawerOpen={handleDrawerOpen}
          setLoading={setProductLoading}
          initialState={filter}
        />
        <Main theme={theme} open={openFilterDrawer} container={container}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <ProductsHeader
                filter={filter}
                handleDrawerOpen={handleDrawerOpen}
                setFilter={setFilter}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {productLoading
                  ? Array.from({ length: 8 }).map((_, idx) => (
                      <Grid key={idx} item xs={12} sm={6} md={4} lg={4}>
                        <SkeletonProductPlaceholder />
                      </Grid>
                    ))
                  : productResult}
              </Grid>
            </Grid>
          </Grid>
        </Main>
      </Box>
    </MainLayout>
  );
};

export default DaftarBarang;
