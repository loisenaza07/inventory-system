import { useEffect, useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid, Table } from "@mui/material";

// project-imports
import Loader from "@/Components/Loader";
import ProductCard from "@/Components/cards/e-commerce/ProductCard";
import FloatingCart from "@/Components/cards/e-commerce/FloatingCart";

import ProductFilterDrawer from "@/sections/apps/e-commerce/products/ProductFilterDrawer";
import SkeletonProductPlaceholder from "@/Components/cards/skeleton/ProductPlaceholder";
import ProductsHeader from "@/sections/apps/e-commerce/products/ProductsHeader";
import ProductEmpty from "@/sections/apps/e-commerce/products/ProductEmpty";

import useConfig from "@/hooks/useConfig";
import { dispatch, useSelector } from "@/store";
import { resetCart } from "@/store/reducers/cart";
import { openDrawer } from "@/store/reducers/menu";
import { getProducts, filterProducts } from "@/store/reducers/product";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { EmptyTable } from "@/Components/third-party/ReactTable";
import axios from "axios";

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

// ==============================|| ECOMMERCE - PRODUCTS ||============================== //

const DaftarBarang = (props) => {
    const theme = useTheme();

    const { container } = useConfig();

    const [loading, setLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(true);
    useEffect(() => {
        setProductLoading(false);
    }, []);

    // product data
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(props.barang);
        setLoading(false);
    }, []);

    const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
    const handleDrawerOpen = () => {
        setOpenFilterDrawer((prevState) => !prevState);
    };

    // filter
    const initialState = {
        search: "",
        status: ["all"],
        jenis_barang: ["all"],
    };
    const [filter, setFilter] = useState(initialState);

    const filterData = async () => {
        //  setProducts([]);
        setProductLoading(false);
    };

    useEffect(() => {
        filterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    let productResult = <></>;
    if (products && products.length > 0) {
        productResult = products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
                <ProductCard
                    id={product.id}
                    image={product.gambar ? product?.gambar[0]?.path : ""}
                    name={product.merk}
                    brand={product.jenis_barang.jenis_barang}
                    offer={product.offer}
                    description={product.description}
                    offerPrice={product.nilai_pengadaan}
                    salePrice={product.salePrice}
                    rating={product.rating}
                    color={product.colors ? product.colors[0] : undefined}
                    open={openFilterDrawer}
                />
            </Grid>
        ));
    } else {
        productResult = (
            <Table item xs={12} sx={{ mt: 3 }}>
                <EmptyTable msg="No Data" colSpan={12} />
            </Table>
        );
    }

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
                    initialState={initialState}
                />
                <Main
                    theme={theme}
                    open={openFilterDrawer}
                    container={container}
                >
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
                                    ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                          <Grid
                                              key={item}
                                              item
                                              xs={12}
                                              sm={6}
                                              md={4}
                                              lg={4}
                                          >
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
