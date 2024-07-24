import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

// material-ui
import { ButtonBase, Typography } from "@mui/material";

// project-imports
import { default as LogoSvg } from "./logoBps.svg";
import { APP_DEFAULT_PATH } from "../../config";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ reverse, isIcon, sx, to }) => (
    <ButtonBase
        disableRipple
        component={Link}
        to={!to ? APP_DEFAULT_PATH : to}
        sx={sx}
    >
        {/* {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />} */}
        {isIcon ? (
            <img src={LogoSvg} alt="logo" style={sx} />
        ) : (
            <>
                <img src={LogoSvg} alt="logo" style={sx} />
                <Typography
                    sx={{ color: "#f27013", fontWeight: "800" }}
                    variant="h4"
                >
                    SITERY
                </Typography>
            </>
        )}
    </ButtonBase>
);

LogoSection.propTypes = {
    reverse: PropTypes.bool,
    isIcon: PropTypes.bool,
    sx: PropTypes.object,
    to: PropTypes.string,
};

export default LogoSection;
