import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/authActions';
import NavbarContainer from '../components/NavbarContainer/NavbarContainer';
import { getMyUid, getMyName } from '../store/profileReducer/profileSelectors';

const NavbarHOC = ({ authenticated, ...props }) => {
  const uid = useSelector(getMyUid);
  const userName = useSelector(getMyName);
  let newProps;
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };

  if (!authenticated) {
    newProps = {
      ...props,
      navbarList: props.navbarList?.filter(item => item.requiredAuth === false),
    };
  } else {
    newProps = {
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
      {...newProps}
    />
  ) : (
    <NavbarContainer auth={authenticated} {...newProps} />
  );
};

export default NavbarHOC;
