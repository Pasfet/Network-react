import { useEffect, useState, FC } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAuth } from './store/auth/authSelectors';
import { loadingFalse, loadingTrue } from './actions/spinnerActions';
import { getNavbarList } from './store/navbarReducer/navbarSelectors';
import { getSnackMessage } from './store/errorReducer/errorSelectors';
import { clearError, clearSnack } from './actions/errorActions';
import { getMyFriendsList } from './actions/profileActions';
import { getMyUid } from './store/profileReducer/profileSelectors';
import Spinner from './components/Spinner/Spinner';
import NavbarHOC from './HOC/withAuthNavbar';
import Routes from './components/Routes/Routes';
import SnackbarAlert from './components/SnackbarAlert/SnackbarAlert';

const AppStyled = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 100%',
  minHeight: '100vh',
});

const Main = styled('main')({
  marginTop: '70px',
  maxWidth: '80%',
  '@media (max-width: 430px)': {
    marginTop: '100px',
  },
});

const App: FC = () => {
  const auth = useSelector(getAuth);
  const navbarList = useSelector(getNavbarList);
  const snackMessage = useSelector(getSnackMessage);
  const uid = useSelector(getMyUid);

  const [authed, setAuthed] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingTrue());
    dispatch(clearSnack());
    dispatch(clearError());
    if (uid) {
      dispatch(getMyFriendsList(uid));
    }
    if (auth) {
      setAuthed(auth);
    } else {
      setAuthed(auth);
      history.push('/login');
    }
    dispatch(loadingFalse());
  }, [auth, dispatch, uid, history]);

  return (
    <AppStyled>
      <NavbarHOC authenticated={authed} navbarList={navbarList} />
      <Main>
        <Routes authed={auth} />
      </Main>
      <Spinner fullPage />
      <SnackbarAlert snackMessage={snackMessage} />
    </AppStyled>
  );
};

export default App;
