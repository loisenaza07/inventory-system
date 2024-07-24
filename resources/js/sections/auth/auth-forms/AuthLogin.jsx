import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink, useForm } from "@inertiajs/react";

// material-ui
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";

// project-imports
import useScriptRef from "@/hooks/useScriptRef";
import IconButton from "@/Components/@extended/IconButton";
import AnimateButton from "@/Components/@extended/AnimateButton";

// assets
import { Eye, EyeSlash } from "iconsax-react";
import axios from "axios";

// ============================|| JWT - LOGIN ||============================ //

const AuthLogin = ({ forgot }) => {
    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "", // Default values
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"))
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                            Email Address
                        </InputLabel>
                        <OutlinedInput
                            id="email-login"
                            type="email"
                            value={data.email}
                            name="email"
                            autoComplete="off"
                            onChange={handleChange}
                            placeholder="Enter email address"
                            fullWidth
                            error={Boolean(errors.email)}
                        />
                        {errors.email && (
                            <FormHelperText error>
                                {errors.email}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(errors.password)}
                            id="password-login"
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            name="password"
                            onChange={handleChange}
                            sx={{ userSelect: "none" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        color="secondary"
                                    >
                                        {showPassword ? <Eye /> : <EyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <FormHelperText error>
                                {errors.password}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.remember}
                                    onChange={handleChange}
                                    name="remember"
                                    color="primary"
                                    size="small"
                                />
                            }
                            label={
                                <Typography variant="h6">
                                    Keep me sign in
                                </Typography>
                            }
                        />
                    </Stack>
                </Grid>
                {errors.submit && (
                    <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            disabled={processing}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </form>
    );
};

AuthLogin.propTypes = {
    forgot: PropTypes.string,
};

export default AuthLogin;
