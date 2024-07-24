import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Grid,
    Rating,
    Stack,
    Typography,
} from "@mui/material";

// project-imports
import MainCard from "@/Components/MainCard";
import IconButton from "@/Components/@extended/IconButton";
import SkeletonProductPlaceholder from "@/Components/cards/skeleton/ProductPlaceholder";
import { dispatch, useSelector } from "@/store";
import { addProduct } from "@/store/reducers/cart";
import { openSnackbar } from "@/store/reducers/snackbar";

// assets
import { Heart } from "iconsax-react";

import prodImage from "@/assets/images/e-commerce/prod-1.png";

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({
    id,
    color,
    name,
    brand,
    offer,
    image,
    description,
    offerPrice,
    salePrice,
    rating,
}) => {
    const theme = useTheme();

    const [wishlisted, setWishlisted] = useState(false);
    const cart = useSelector((state) => state.cart);

    const addCart = () => {
        dispatch(
            addProduct(
                {
                    id,
                    name,
                    image,
                    salePrice,
                    offerPrice,
                    color,
                    size: 8,
                    quantity: 1,
                    description,
                },
                cart.checkout.products
            )
        );
        dispatch(
            openSnackbar({
                open: true,
                message: "Add To Cart Success",
                variant: "alert",
                alert: {
                    color: "success",
                },
                close: false,
            })
        );
    };

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <SkeletonProductPlaceholder />;

    return (
        <MainCard
            content={false}
            sx={{
                "&:hover": {
                    transform: "scale3d(1.02, 1.02, 1)",
                    transition: "all .4s ease-in-out",
                },
            }}
        >
            <Box sx={{ width: 250, m: "auto" }}>
                <CardMedia
                    sx={{
                        height: 250,
                        textDecoration: "none",
                    }}
                    image={`/storage/${image}`}
                    component={Link}
                    href={`/barang/daftar-barang/details/${id}`}
                />
            </Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    pt: 1.75,
                    pl: 2,
                    pr: 1,
                }}
            >
                {/* {!isStock && (
                    <Chip
                        variant="light"
                        color="error"
                        size="small"
                        label="Sold out"
                    />
                )}
                {offer && (
                    <Chip
                        label={offer}
                        variant="combined"
                        color="success"
                        size="small"
                    />
                )} */}
                {/* <IconButton
                    color="secondary"
                    sx={{
                        ml: "auto",
                        "&:hover": { background: "transparent" },
                    }}
                    onClick={addToFavourite}
                >
                    {wishlisted ? (
                        <Heart
                            variant="Bold"
                            style={{
                                fontSize: "1.15rem",
                                color: theme.palette.error.main,
                            }}
                        />
                    ) : (
                        <Heart style={{ fontSize: "1.15rem" }} />
                    )}
                </IconButton> */}
            </Stack>
            <Divider />
            <CardContent sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack>
                            <Typography
                                component={Link}
                                to={`/apps/e-commerce/product-details/${id}`}
                                color="textPrimary"
                                variant="h5"
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    display: "block",
                                    textDecoration: "none",
                                }}
                            >
                                {name}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" textTransform={"capitalize"}>
                                {brand}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack
                            direction="col"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            flexWrap="wrap"
                            rowGap={1.75}
                        >
                            {/* <Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Typography variant="h5">
                                        Rp{offerPrice}
                                    </Typography>
                                </Stack>
                            </Stack> */}

                            <Button
                                variant="contained"
                                onClick={addCart}
                                fullWidth
                                LinkComponent={Link}
                                href={`/barang/daftar-barang/details/${id}`}
                            >
                               Lihat Detail
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number,
    color: PropTypes.string,
    name: PropTypes.string,
    brand: PropTypes.string,
    isStock: PropTypes.bool,
    image: PropTypes.string,
    description: PropTypes.string,
    offerPrice: PropTypes.number,
    salePrice: PropTypes.number,
    offer: PropTypes.string,
    rating: PropTypes.number,
};

export default ProductCard;
