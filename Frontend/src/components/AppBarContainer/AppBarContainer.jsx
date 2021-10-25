import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import PropTypes from 'prop-types';
import { memo } from 'react';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarContainer = ({ open, setOpen, userName, auth }) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          data-testid="openBarButton"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Social network
        </Typography>
        {auth && (
          <>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{ margin: '0 20px 0 auto !important' }}
            >
              {userName}
            </Typography>
            <AccountCircleRoundedIcon />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

AppBarContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  userName: PropTypes.string,
};

export default memo(AppBarContainer);
