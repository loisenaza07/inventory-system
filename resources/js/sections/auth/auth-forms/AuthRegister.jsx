import { useEffect, useState } from "react";
import { Link as RouterLink, useForm } from "@inertiajs/react";

// material-ui
import {
    Box,
    Button,
    FormControl,
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
import useAuth from "../../../hooks/useAuth";
import useScriptRef from "../../../hooks/useScriptRef";
import IconButton from "../../../Components/@extended/IconButton";
import AnimateButton from "../../../Components/@extended/AnimateButton";

import { dispatch } from "../../../store";
import { openSnackbar } from "../../../store/reducers/snackbar";
import {
    strengthColor,
    strengthIndicator,
} from "../../../utils/password-strength";

// assets
import { Eye, EyeSlash } from "iconsax-react";

// ============================|| JWT - REGISTER ||============================ //

const AuthRegister = () => {
    const { register } = useAuth();
    const scriptedRef = useScriptRef();

    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword("");
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: "",
        lastname: "",
        email: "",
        nip: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        if (e.target.name === "password") {
            changePassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register", {
            onSuccess: () => {
                if (scriptedRef.current) {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message:
                                "Your registration has been successfully completed.",
                            variant: "alert",
                            alert: {
                                color: "success",
                            },
                            close: false,
                        })
                    );

                    // Uncomment to redirect after registration
                    // setTimeout(() => {
                    //     navigate("/login", { replace: true });
                    // }, 1500);
                }
            },
            onError: (err) => {
                console.error(err);
                if (scriptedRef.current) {
                    // Handle errors
                }
            },
        });
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="firstname-signup">
                            First Name*
                        </InputLabel>
                        <OutlinedInput
                            id="firstname-signup"
                            type="text"
                            value={data.firstname}
                            name="firstname"
                            onChange={handleChange}
                            placeholder="John"
                            fullWidth
                            error={Boolean(errors.firstname)}
                        />
                        {errors.firstname && (
                            <FormHelperText
                                error
                                id="helper-text-firstname-signup"
                            >
                                {errors.firstname}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="lastname-signup">
                            Last Name*
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(errors.lastname)}
                            id="lastname-signup"
                            type="text"
                            value={data.lastname}
                            name="lastname"
                            onChange={handleChange}
                            placeholder="Doe"
                        />
                        {errors.lastname && (
                            <FormHelperText
                                error
                                id="helper-text-lastname-signup"
                            >
                                {errors.lastname}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="nip-signup">NIP</InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(errors.nip)}
                            id="nip-signup"
                            type="text"
                            value={data.nip}
                            name="nip"
                            onChange={handleChange}
                            placeholder="1402xxx"
                        />
                        {errors.nip && (
                            <FormHelperText error id="helper-text-nip-signup">
                                {errors.nip}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="email-signup">
                            Email Address*
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(errors.email)}
                            id="email-signup"
                            type="email"
                            value={data.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="demo@company.com"
                        />
                        {errors.email && (
                            <FormHelperText error id="helper-text-email-signup">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="password-signup">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(errors.password)}
                            id="password-signup"
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            name="password"
                            onChange={handleChange}
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
                            placeholder="******"
                        />
                        {errors.password && (
                            <FormHelperText
                                error
                                id="helper-text-password-signup"
                            >
                                {errors.password}
                            </FormHelperText>
                        )}
                    </Stack>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    sx={{
                                        bgcolor: level?.color,
                                        width: 85,
                                        height: 8,
                                        borderRadius: "7px",
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    fontSize="0.75rem"
                                >
                                    {level?.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                {errors.submit && (
                    <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="password-signup">
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(errors.password_confirmation)}
                            id="password-signup"
                            type={"password"}
                            value={data.password_confirmation}
                            name="password_confirmation"
                            onChange={handleChange}
                            placeholder="******"
                        />
                        {errors.password && (
                            <FormHelperText
                                error
                                id="helper-text-password-signup"
                            >
                                {errors.password}
                            </FormHelperText>
                        )}
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
                            Create Account
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default AuthRegister;
