import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MovieIcon from '@mui/icons-material/Movie';
import InboxIcon from '@mui/icons-material/Inbox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FriendsIcon from '@mui/icons-material/PeopleAlt';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

const NavbarItems = ({ uid, navbarList }) => {
  const history = useHistory();

  const ItemIcon = iconName => {
    switch (iconName) {
      case 'login':
        return <LoginIcon />;
      case 'profile':
        return <PersonIcon />;
      case 'messages':
        return <ChatBubbleIcon />;
      case 'movie':
        return <MovieIcon />;
      case 'signup':
        return <AssignmentIndIcon />;
      case 'friends':
        return <FriendsIcon />;
      default:
        return <InboxIcon />;
    }
  };
  return (
    <List>
      {navbarList?.map(item => (
        <ListItem
          button
          key={item.name}
          onClick={() => {
            item?.dynamic ? history.push(`${item.href}/${uid}`) : history.push(`${item.href}`);
          }}
        >
          <ListItemIcon>{item?.icon && ItemIcon(item.icon)}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

NavbarItems.propTypes = {
  uid: PropTypes.string,
  navbarList: PropTypes.array,
};

export default NavbarItems;
