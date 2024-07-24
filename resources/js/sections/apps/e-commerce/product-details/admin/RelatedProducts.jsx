import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Rating,
    Stack,
    Typography,
} from "@mui/material";

// project-imports
import Loader from "@/Components/Loader";
import Avatar from "@/Components/@extended/Avatar";
import SimpleBar from "@/Components/third-party/SimpleBar";
import IconButton from "@/Components/@extended/IconButton";

import { dispatch, useSelector } from "@/store";
import { getRelatedProducts } from "@/store/reducers/product";
import { openSnackbar } from "@/store/reducers/snackbar";

// assets
import { Heart } from "iconsax-react";

import prodImage from "@/assets/images/e-commerce/thumbs/prod-1.png";

const ListProduct = ({ product }) => {
    const theme = useTheme();

    const [wishlisted, setWishlisted] = useState(false);
    const addToFavourite = () => {
        setWishlisted(!wishlisted);
        dispatch(
            openSnackbar({
                open: true,
                message: "Added to favourites",
                variant: "alert",
                alert: {
                    color: "success",
                },
                close: false,
            })
        );
    };

    return (
        <ListItemButton
            divider
            onClick={() =>
                router.visit(`/admin/barang/daftar-barang/details/${product.id}`)
            }
        >
            <ListItemAvatar>
                <Avatar
                    alt="Avatar"
                    size="xl"
                    color="secondary"
                    variant="rounded"
                    type="combined"
                    src={`/storage/${product.gambar[0]?.path}`}
                    sx={{ borderColor: theme.palette.divider, mr: 1 }}
                />
            </ListItemAvatar>
            <ListItemText
                disableTypography
                primary={
                    <Typography variant="subtitle1">{product.merk}</Typography>
                }
                secondary={
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                            textTransform={"capitalize"}
                        >
                            {product.jenis_barang.jenis_barang}
                        </Typography>
                        <Stack spacing={1}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                            >
                                <Typography variant="h5">
                                    {product.user.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                }
            />
        </ListItemButton>
    );
};

ListProduct.propTypes = {
    product: PropTypes.object,
};

// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

const RelatedProducts = ({ product }) => {
    const [loading, setLoading] = useState(true);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        setRelated(product);
        setLoading(false);
    }, []);

    let productResult = <></>;
    if (related) {
        productResult = (
            <List
                component="nav"
                sx={{
                    "& .MuiListItemButton-root": {
                        borderRadius: 0,
                        my: 0,
                        px: 3,
                        py: 2,
                        alignItems: "flex-start",
                        "& .MuiListItemSecondaryAction-root": {
                            alignSelf: "flex-start",
                            ml: 1,
                            position: "relative",
                            right: "auto",
                            top: "auto",
                            transform: "none",
                        },
                        "& .MuiListItemAvatar-root": { mr: 1, mt: 0.75 },
                    },
                    p: 0,
                }}
            >
                {related.map((product, index) => (
                    <ListProduct key={index} product={product} />
                ))}
            </List>
        );
    }
    if (loading) return <Loader />;

    return (
        <SimpleBar sx={{ height: { xs: "100%", md: "calc(100% - 62px)" } }}>
            <Grid item>
                <Stack>
                    {productResult}
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        <Link
                            href="/admin/barang/daftar-barang"
                            style={{
                                textAlign: "center",
                                width: "fit-content",
                            }}
                        >
                            <Button
                                color="secondary"
                                variant="outlined"
                                sx={{ textTransform: "none" }}
                            >
                                Lihat semua barang
                            </Button>
                        </Link>
                    </Box>
                </Stack>
            </Grid>
        </SimpleBar>
    );
};

RelatedProducts.propTypes = {
    id: PropTypes.string,
};

export default RelatedProducts;
