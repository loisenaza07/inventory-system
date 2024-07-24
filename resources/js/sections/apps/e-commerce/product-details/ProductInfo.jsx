import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Button,
    ButtonBase,
    Chip,
    Grid,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

// third-party
import * as yup from "yup";

// project-imports
import ColorOptions from "../products/ColorOptions";
import Avatar from "@/Components/@extended/Avatar";
import { ThemeMode } from "@/config";

// assets
import { DocumentText } from "iconsax-react";
import { FormattedNumber } from "react-intl";

// product color select
function getColor(color) {
    return ColorOptions.filter((item) => item.value === color);
}

const validationSchema = yup.object({
    color: yup.string().required("Color selection is required"),
});

// ==============================|| COLORS OPTION ||============================== //

const Colors = ({ checked, colorsData }) => {
    const theme = useTheme();
    return (
        <Grid item>
            <Tooltip
                title={
                    colorsData.length && colorsData[0] && colorsData[0].label
                        ? colorsData[0].label
                        : ""
                }
            >
                <ButtonBase
                    sx={{
                        borderRadius: "50%",
                        "&:focus-visible": {
                            outline: `2px solid ${theme.palette.secondary.dark}`,
                            outlineOffset: 2,
                        },
                    }}
                >
                    <Avatar
                        color="inherit"
                        size="sm"
                        sx={{
                            bgcolor: colorsData[0]?.bg,
                            color:
                                theme.palette.mode === ThemeMode.DARK
                                    ? "secondary.800"
                                    : "secondary.lighter",
                            border: "3px solid",
                            borderColor: checked
                                ? theme.palette.secondary.light
                                : theme.palette.background.paper,
                        }}
                    >
                        {" "}
                    </Avatar>
                </ButtonBase>
            </Tooltip>
        </Grid>
    );
};

Colors.propTypes = {
    checked: PropTypes.bool,
    colorsData: PropTypes.array,
};

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }) => {
    return (
        <Stack spacing={1}>
            <Typography variant="h3">{product.merk}</Typography>
            <Chip
                size="small"
                label={product.jenis_barang.jenis_barang}
                sx={{
                    width: "fit-content",
                    borderRadius: "4px",
                    color: "success.main",
                    bgcolor: "success.lighter",
                    textTransform: "capitalize",
                }}
            />
            <Typography color="textSecondary">{product.no_bmn}</Typography>
            <Typography color="textSecondary">{product.status}</Typography>
            <Typography color="textSecondary">
                {product.ruangan.nama_ruangan}
            </Typography>

            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <FormattedNumber
                        variant="h3"
                        value={product.nilai_pengadaan}
                        style="currency"
                        currency="IDR"
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                >
                    <Link href="/pengaduan/buat-pengaduan">
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            startIcon={<DocumentText />}
                            sx={{
                                textTransform: "capitalize",
                                textDecoration: "none",
                            }}
                        >
                            Buat Pengaduan
                        </Button>
                    </Link>
                </Stack>
            </Grid>
        </Stack>
    );
};

ProductInfo.propTypes = {
    product: PropTypes.object,
    id: PropTypes.number,
    image: PropTypes.node,
    salePrice: PropTypes.object,
    offerPrice: PropTypes.object,
    rating: PropTypes.string,
    name: PropTypes.string,
    isStock: PropTypes.bool,
    about: PropTypes.string,
    colors: PropTypes.string,
};

export default ProductInfo;
