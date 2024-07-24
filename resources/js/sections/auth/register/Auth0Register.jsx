import { useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid } from '@mui/material';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { ProfileAdd } from 'iconsax-react';

// ============================|| AUTH0 - REGISTER ||============================ //

const AuthRegister = () => {
  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const [error, setError] = useState(null);
  const loginHandler = async () => {
    try {
      await login();
    } catch (err) {
      if (scriptedRef.current) {
        setError(err.message);
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {error && (
        <Grid item xs={12}>
          <FormHelperText error>{error}</FormHelperText>
        </Grid>
      )}

      <Grid item xs={12}>
        <AnimateButton>
          <Button onClick={loginHandler} variant="contained" fullWidth startIcon={<ProfileAdd />}>
            Sing up with Auth0
          </Button>
        </AnimateButton>
      </Grid>
    </Grid>
  );
};

export default AuthRegister;
