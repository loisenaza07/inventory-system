import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, CardMedia, Grid, Stack, useMediaQuery } from "@mui/material";

// project-imports
import MainCard from "@/Components/MainCard";
import Avatar from "@/Components/@extended/Avatar";
import IconButton from "@/Components/@extended/IconButton";
import { ThemeMode } from "@/config";
import { dispatch, useSelector } from "@/store";
import { openSnackbar } from "@/store/reducers/snackbar";

// third-party
import Slider from "react-slick";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// assets
import {
    ArrowLeft2,
    ArrowRight2,
    ArrowRotateRight,
    Heart,
    SearchZoomIn,
    SearchZoomOut,
} from "iconsax-react";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }) => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.up("lg"));
    const initialImage = "/storage/" + product.gambar[0]?.path;

    const [selected, setSelected] = useState(initialImage);
    const [modal, setModal] = useState(false);
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

    const lgNo = matchDownLG ? 5 : 4;

    const ArrowUp = ({ currentSlide, slideCount, ...props }) => (
        <Box
            {...props}
            id={slideCount}
            className={"prev" + (currentSlide === 0 ? " slick-disabled" : "")}
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
            color="secondary"
            sx={{ cursor: "pointer", borderRadius: 1 }}
        >
            <ArrowLeft2 style={{ color: theme.palette.secondary.light }} />
        </Box>
    );

    ArrowUp.propTypes = {
        currentSlide: PropTypes.number,
        slideCount: PropTypes.number,
    };

    const ArrowDown = ({ currentSlide, slideCount, ...props }) => (
        <Box
            {...props}
            color="secondary"
            className={
                "next" +
                (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            sx={{ cursor: "pointer", borderRadius: 1, p: 0.75 }}
        >
            <ArrowRight2
                size={18}
                style={{ color: theme.palette.secondary[400] }}
            />
        </Box>
    );

    ArrowDown.propTypes = {
        currentSlide: PropTypes.number,
        slideCount: PropTypes.number,
    };

    const settings = {
        rows: 1,
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: "0px",
        slidesToShow: product.gambar.length > 3 ? lgNo : product.gambar.length,
        prevArrow: <ArrowUp />,
        nextArrow: <ArrowDown />,
    };

    return (
        <>
            <Grid container spacing={0.5}>
                <Grid item xs={12}>
                    <MainCard
                        content={false}
                        border={false}
                        boxShadow={false}
                        sx={{
                            m: "0 auto",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            bgcolor:
                                theme.palette.mode === ThemeMode.DARK
                                    ? "secondary.lighter"
                                    : "secondary.200",
                            "& .react-transform-wrapper": {
                                cursor: "crosshair",
                                height: "100%",
                            },
                            "& .react-transform-component": { height: "100%" },
                        }}
                    >
                        <TransformWrapper initialScale={1}>
                            {({ zoomIn, zoomOut, resetTransform }) => (
                                <>
                                    <TransformComponent>
                                        <CardMedia
                                            onClick={() => setModal(!modal)}
                                            component="img"
                                            image={selected}
                                            title="Scroll Zoom"
                                            sx={{
                                                borderRadius: `4px`,
                                                position: "relative",
                                            }}
                                        />
                                    </TransformComponent>
                                    <Stack
                                        direction="row"
                                        className="tools"
                                        sx={{
                                            position: "absolute",
                                            bottom: 10,
                                            right: 10,
                                            zIndex: 1,
                                        }}
                                    >
                                        <IconButton
                                            color="secondary"
                                            onClick={() => zoomIn()}
                                        >
                                            <SearchZoomIn
                                                style={{ fontSize: "1.15rem" }}
                                            />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => zoomOut()}
                                        >
                                            <SearchZoomOut
                                                style={{ fontSize: "1.15rem" }}
                                            />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => resetTransform()}
                                        >
                                            <ArrowRotateRight
                                                style={{ fontSize: "1.15rem" }}
                                            />
                                        </IconButton>
                                    </Stack>
                                </>
                            )}
                        </TransformWrapper>
                    </MainCard>
                </Grid>
                <Grid item xs={12}>
                    <Swiper direction="horizontal" slidesPerView={10} spaceBetween={3}>
                        {product.gambar?.map((image, index) => (
                            <SwiperSlide
                                key={index}
                                onClick={() =>
                                    setSelected(`/storage/${image.path}`)
                                }
                            >
                                <Avatar
                                    size="sm"
                                    src={`/storage/${image.path}`}
                                    variant="rounded"
                                    sx={{
                                        margin: '10px',
                                        cursor: "pointer",
                                        bgcolor: theme.palette.secondary[200],
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>
            </Grid>
        </>
    );
};

ProductImages.propTypes = {
    product: PropTypes.shape({
        gambar: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default ProductImages;
