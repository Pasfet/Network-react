import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from './App.module.scss';
import { getAuth } from './store/auth/authSelector';
import { loadingFalse, loadingTrue } from './actions/spinnerAction';
import { getNavbarList } from './store/navbarReducer/navbarSelector';
import Spinner from './components/Spinner/Spinner';
import NavbarHOC from './HOC/withAuthNavbar';
import Routes from './components/Routes/Routes';
import NavbarContainer from './components/NavbarContainer/NavbarContainer';
import SnackbarAlert from './components/SnackbarAlert/SnackbarAlert';
import { getSnackMessage } from './store/errorReducer/errorSelector';

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
    <div className={style.App}>
      <NavbarHOC authenticated={authed} navbarList={navbarList}>
        <NavbarContainer />
      </NavbarHOC>
      <main className={style.main}>
        <Routes authed={auth} />
      </main>
      <Spinner fullPage />
      <SnackbarAlert snackMessage={snackMessage} />
    </div>
  );
};

export default App;
