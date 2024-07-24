import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Box,
    Chip,
    Divider,
    Grid,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";

// project-imports
import Loader from "@/Components/Loader";
import MainCard from "@/Components/MainCard";
import FloatingCart from "@/Components/cards/e-commerce/FloatingCart";

import ProductFeatures from "@/sections/apps/e-commerce/product-details/ProductFeatures";
import ProductImages from "@/sections/apps/e-commerce/product-details/ProductImages";
import ProductInfo from "@/sections/apps/e-commerce/product-details/admin/ProductInfo";
import ProductReview from "@/sections/apps/e-commerce/product-details/ProductReview";
import ProductSpecifications from "@/sections/apps/e-commerce/product-details/ProductSpecifications";
import RelatedProducts from "@/sections/apps/e-commerce/product-details/admin/RelatedProducts";

import { dispatch, useSelector } from "@/store";
import { getProduct } from "@/store/reducers/product";
import { resetCart } from "@/store/reducers/cart";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-details-tabpanel-${index}`}
            aria-labelledby={`product-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `product-details-tab-${index}`,
        "aria-controls": `product-details-tabpanel-${index}`,
    };
}

// ==============================|| ECOMMERCE - PRODUCT DETAILS ||============================== //

const DetailsBarang = (props) => {
    const theme = useTheme();
    console.log(props)

    const [product, setProduct] = useState(props.barang);

    const [loading, setLoading] = useState(true);
    // product description tabs
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setLoading(false)

    }, [product?.id]);

    if (loading) return <Loader />;

    return (
        <MainLayout user={props.auth.user} roles={props.auth.roles}>
            <Head title="Detail Barang" />
            {product && product.id  && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8} md={5} lg={4}>
                                <ProductImages product={product} />
                            </Grid>

                            <Grid item xs={12} md={7} lg={8}>
                                <MainCard
                                    border={false}
                                    sx={{
                                        height: "100%",
                                        bgcolor: "secondary.lighter",
                                    }}
                                >
                                    <ProductInfo product={product} />
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7} xl={8}>
                        <MainCard>
                            <Stack spacing={3}>
                                <Stack>
                                    <Tabs
                                        value={value}
                                        indicatorColor="primary"
                                        onChange={handleChange}
                                        aria-label="product description tabs example"
                                        variant="scrollable"
                                    >
                                        <Tab
                                            label="Detail Barang"
                                            {...a11yProps(0)}
                                        />
                                        <Tab
                                            label="Riwayat Perbaikan"
                                            {...a11yProps(1)}
                                        />
                                    </Tabs>
                                    <Divider />
                                </Stack>
                                <TabPanel value={value} index={0}>
                                    <ProductFeatures product={product} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <ProductSpecifications product={product} />
                                </TabPanel>
                            </Stack>
                        </MainCard>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={5}
                        xl={4}
                        sx={{ position: "relative" }}
                    >
                        <MainCard
                            title="Barang Lainnya"
                            sx={{
                                height: "calc(100% - 16px)",
                                position: { xs: "relative", md: "absolute" },
                                top: "16px",
                                left: { xs: 0, md: 16 },
                                right: 0,
                            }}
                            content={false}
                        >
                            <RelatedProducts product={props.semuaBarang} />
                        </MainCard>
                    </Grid>
                </Grid>
            )}
        </MainLayout>
    );
};

export default DetailsBarang;
