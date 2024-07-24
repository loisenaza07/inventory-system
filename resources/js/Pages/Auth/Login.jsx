import { Head, Link, useForm } from "@inertiajs/react";

// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project-imports
import Logo from "../../Components/logo";
import AuthSocButton from "../../sections/auth/AuthSocButton";
import AuthDivider from "../../sections/auth/AuthDivider";
import AuthWrapper from "../../sections/auth/AuthWrapper";
import AuthLogin from "../../sections/auth/auth-forms/AuthLogin";

// assets
import imgBps from "../../assets/images/auth/logo-bps.svg";

// ================================|| LOGIN ||================================ //

const Login = () => {

    return (
        <AuthWrapper>
            <Head title="Login" />
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Logo sx={{width: "100px"}} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AuthSocButton>
                                <img
                                    src={imgBps}
                                    alt="logo bps"
                                    style={{ margin: "0 10px", width: '25px' }}
                                />{" "}
                                Sign In with SSO
                            </AuthSocButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <AuthDivider>
                        <Typography variant="body1">OR</Typography>
                    </AuthDivider>
                </Grid>
                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                    >
                        <Typography variant="h3">Login</Typography>
                        <Link
                            component={Link}
                            href={"/register"}
                            variant="body1"
                            style={{ textDecoration: "none", color: "#f27013" }}
                            color="primary"
                        >
                            Don&apos;t have an account?
                        </Link>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <AuthLogin forgot="/auth/forgot-password" />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
