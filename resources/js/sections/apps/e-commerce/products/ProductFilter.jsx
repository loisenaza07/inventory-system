import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    Rating,
    Skeleton,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

// project-imports
import Colors from "./Colors";

// ==============================|| PRODUCT - GENDER FILTER ||============================== //

const Status = ({ status, handelFilter }) => {
    const [isGenderLoading, setGenderLoading] = useState(true);
    useEffect(() => {
        setGenderLoading(false);
    }, []);

    return (
        <Stack>
            {isGenderLoading ? (
                <Skeleton variant="rectangular" width="100%" height={42} />
            ) : (
                <>
                    <Typography variant="h5">Status</Typography>
                    <Box sx={{ pl: 0.5 }}>
                        <Stack>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.some(
                                            (item) => item === "all"
                                        )}
                                    />
                                }
                                onChange={() => handelFilter("status", "all")}
                                label="All"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.some(
                                            (item) => item === "baik"
                                        )}
                                    />
                                }
                                onChange={() => handelFilter("status", "baik")}
                                label="Baik"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.some(
                                            (item) => item === "rusak"
                                        )}
                                        onChange={() =>
                                            handelFilter("status", "rusak")
                                        }
                                    />
                                }
                                label="Rusak"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.some(
                                            (item) => item === "rusak-berat"
                                        )}
                                        onChange={() =>
                                            handelFilter(
                                                "status",
                                                "rusak-berat"
                                            )
                                        }
                                    />
                                }
                                label="Rusak Berat"
                            />
                        </Stack>
                    </Box>
                </>
            )}
        </Stack>
    );
};

Status.propTypes = {
    status: PropTypes.array,
    handelFilter: PropTypes.func,
};

// ==============================|| PRODUCT GRID - CATEGORIES FILTER ||============================== //

const JenisBarang = ({ jenis_barang, handelFilter }) => {
    const [isCategoriesLoading, setCategoriesLoading] = useState(true);
    useEffect(() => {
        setCategoriesLoading(false);
    }, []);

    return (
        <Stack>
            {isCategoriesLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={96} />
                </Grid>
            ) : (
                <>
                    <Typography variant="h5">Jenis Barang</Typography>
                    <Box sx={{ pl: 0.5 }}>
                        <Stack>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={jenis_barang.some(
                                            (item) => item === "all"
                                        )}
                                    />
                                }
                                onChange={() =>
                                    handelFilter("jenis_barang", "all")
                                }
                                label="All"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={jenis_barang.some(
                                            (item) => item === "ups"
                                        )}
                                    />
                                }
                                onChange={() =>
                                    handelFilter("jenis_barang", "ups")
                                }
                                label="UPS"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={jenis_barang.some(
                                            (item) => item === "monitor"
                                        )}
                                    />
                                }
                                onChange={() =>
                                    handelFilter("jenis_barang", "monitor")
                                }
                                label="Monitor"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={jenis_barang.some(
                                            (item) => item === "keyboard"
                                        )}
                                    />
                                }
                                onChange={() =>
                                    handelFilter("jenis_barang", "keyboard")
                                }
                                label="Keyboard"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={jenis_barang.some(
                                            (item) => item === "mouse"
                                        )}
                                    />
                                }
                                onChange={() =>
                                    handelFilter("jenis_barang", "mouse")
                                }
                                label="Mouse"
                            />
                        </Stack>
                    </Box>
                </>
            )}
        </Stack>
    );
};

JenisBarang.propTypes = {
    jenis_barang: PropTypes.array,
    handelFilter: PropTypes.func,
};

// ==============================|| PRODUCT GRID - PRICE FILTER ||============================== //

const Price = ({ handelFilter }) => {
    const [isPriceLoading, setPriceLoading] = useState(true);
    useEffect(() => {
        setPriceLoading(false);
    }, []);

    const valuetext = (value) => `${value}`;

    const [value, setValue] = useState([0, 300]);
    const handleSlider = (event, newValue) => {
        setValue(newValue);
        const data = `${newValue[0]}-${newValue[1]}`;
        handelFilter("nilai", data);
    };

    return (
        <>
            {isPriceLoading ? (
                <Skeleton variant="rectangular" width="100%" height={172} />
            ) : (
                <Stack spacing={1}>
                    <Typography variant="h5">Nilai Barang</Typography>
                    <Stack direction="row" spacing={2}>
                        <Stack spacing={0.5}>
                            <Typography color="textSecondary">Min</Typography>
                            <TextField
                                value={value[0]}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Stack>
                        <Stack spacing={0.5}>
                            <Typography color="textSecondary">Max</Typography>
                            <TextField
                                value={value[1]}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Box sx={{ px: 0.75 }}>
                        <Slider
                            min={0}
                            max={1000}
                            value={value}
                            onChange={handleSlider}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                        />
                    </Box>
                </Stack>
            )}
        </>
    );
};

Price.propTypes = {
    handelFilter: PropTypes.func,
};

// ==============================|| PRODUCT GRID - RATING FILTER ||============================== //

const RatingSection = ({ rating, handelFilter }) => {
    const [isRatingLoading, setRatingLoading] = useState(true);
    useEffect(() => {
        setRatingLoading(false);
    }, []);

    return (
        <>
            {isRatingLoading ? (
                <Skeleton variant="rectangular" width="100%" height={172} />
            ) : (
                <Stack spacing={1}>
                    <Typography variant="h5">Rating</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Rating
                            precision={0.5}
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) =>
                                handelFilter("rating", "", newValue)
                            }
                        />
                        <Typography component="legend">({rating})</Typography>
                    </Stack>
                </Stack>
            )}
        </>
    );
};

RatingSection.propTypes = {
    rating: PropTypes.number,
    handelFilter: PropTypes.func,
};
// ==============================|| PRODUCT GRID - FILTER ||============================== //

const ProductFilter = ({ filter, handelFilter }) => (
    <Grid container direction="column" rowSpacing={3}>
        <Grid item>
            <Status status={filter.status} handelFilter={handelFilter} />
        </Grid>
        <Grid item>
            <JenisBarang
                jenis_barang={filter.jenis_barang}
                handelFilter={handelFilter}
            />
        </Grid>
        {/* <Grid item>
      <Colors colors={filter.colors} handelFilter={handelFilter} />
    </Grid> */}
        {/* <Grid item>
      <Price price={filter.price} handelFilter={handelFilter} />
    </Grid> */}
        {/* <Grid item>
      <RatingSection rating={filter.rating} handelFilter={handelFilter} />
    </Grid> */}
    </Grid>
);

ProductFilter.propTypes = {
    filter: PropTypes.object,
    handelFilter: PropTypes.func,
};

export default ProductFilter;
