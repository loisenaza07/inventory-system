// material-ui
import { useMediaQuery, useTheme } from '@mui/material';

// project-imports
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from '@/Components/third-party/SimpleBar';
import { useSelector } from '@/store';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = ({roles}) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const { drawerOpen } = useSelector((state) => state.menu);

  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <>
        <Navigation roles={roles} />
        {/* {drawerOpen && !matchDownMD && <NavCard />} */}
      </>
    </SimpleBar>
  );
};

export default DrawerContent;
