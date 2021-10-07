import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/authActions';
import Navbar from '../components/Navbar/Navbar';
import { getUid } from '../store/profileReducer/profileSelector';

const NavbarHOC = ({ authenticated, ...props }) => {
  const uid = useSelector(getUid);
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
    <Navbar auth={authenticated} uid={uid} {...props} logOut={logOutHandler} />
  ) : (
    <Navbar {...props} />
  );
};

export default NavbarHOC;
