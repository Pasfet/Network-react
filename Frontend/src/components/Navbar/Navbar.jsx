import { Box, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './Navbar.module.scss';

const Navbar = ({ navbarList, uid, auth, logOut }) => {
  return (
    <Box className={style.navbar}>
      <nav>
        <List>
          {navbarList?.map(item => (
            <ListItem disablePadding key={item.name} divider sx={{ justifyContent: 'center' }}>
              <Link to={item?.dynamic ? `${item.href}/${uid}` : item.href} className={style.link}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        {auth && (
          <Button variant="contained" onClick={logOut}>
            Log out
          </Button>
        )}
      </nav>
    </Box>
  );
};

Navbar.propsTypes = {
  uid: PropTypes.number,
  navbarList: PropTypes.array.isRequired,
  auth: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Navbar;
