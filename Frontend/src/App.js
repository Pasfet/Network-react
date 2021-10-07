import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from './App.module.scss';
import { getAuth } from './store/auth/authSelector';
import { loadingFalse, loadingTrue } from './actions/spinnerAction';
import { clearError } from './actions/errorAction';
import { getNavbarList } from './store/navbarReducer/navbarSelector';
import Spinner from './components/Spinner/Spinner';
import Navbar from './components/Navbar/Navbar';
import NavbarHOC from './HOC/withAuthNavbar';
import Routes from './components/Routes/Routes';

const App = () => {
  const auth = useSelector(getAuth);
  const navbarList = useSelector(getNavbarList);
  const [authed, setAuthed] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
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
        <Navbar />
      </NavbarHOC>
      <main className={style.main}>
        <Routes authed={auth} />
      </main>
      <Spinner fullPage />
    </div>
  );
};

export default App;
