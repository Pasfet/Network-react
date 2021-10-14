import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/authActions';
import NavbarContainer from '../components/NavbarContainer/NavbarContainer';
import { getUid, getUserName } from '../store/profileReducer/profileSelector';

const NavbarHOC = ({ authenticated, ...props }) => {
  const uid = useSelector(getUid);
  const userName = useSelector(getUserName);

  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };

  if (!authenticated) {
    props = {
      ...props,
      navbarList: props.navbarList?.filter(item => item.requiredAuth === false),
    };
  } else {
    props = {
      ...props,
      navbarList: props.navbarList?.filter(item => item.requiredAuth === true || item?.public),
    };
  }

  return authenticated ? (
    <NavbarContainer
      auth={authenticated}
      uid={uid}
      logOut={logOutHandler}
      userName={userName}
      {...props}
    />
  ) : (
    <NavbarContainer auth={authenticated} {...props} />
  );
};

export default NavbarHOC;
