import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAuth } from './store/auth/authSelector';
import { loadingFalse, loadingTrue } from './actions/spinnerAction';
import { getNavbarList } from './store/navbarReducer/navbarSelector';
import Spinner from './components/Spinner/Spinner';
import NavbarHOC from './HOC/withAuthNavbar';
import Routes from './components/Routes/Routes';
import SnackbarAlert from './components/SnackbarAlert/SnackbarAlert';
import { getSnackMessage } from './store/errorReducer/errorSelector';

const AppStyled = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 100%',
  minHeight: '100vh',
});

const Main = styled('main')({
  marginTop: '70px',
  maxWidth: '80%',
});

const App = () => {
  const auth = useSelector(getAuth);
  const navbarList = useSelector(getNavbarList);
  const snackMessage = useSelector(getSnackMessage);
  const [authed, setAuthed] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingTrue());
    if (auth) {
      setAuthed(auth);
    } else {
      setAuthed(auth);
      history.push('/login');
    }
    dispatch(loadingFalse());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
