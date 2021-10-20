import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/authActions';
import NavbarContainer from '../components/NavbarContainer/NavbarContainer';
import { getMyUid, getMyName } from '../store/profileReducer/profileSelector';

const NavbarHOC = ({ authenticated, ...props }) => {
  const uid = useSelector(getMyUid);
  const userName = useSelector(getMyName);

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
