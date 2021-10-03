import style from './App.module.scss';
import { Link, Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import Dialogs from './pages/Dialogs/Dialogs';
import Anime from './pages/Anime/Anime';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Spinner from './components/Spinner/Spinner';

const navbarItem = [
  { name: 'Profile', href: '/' },
  { name: 'Messages', href: '/dialogs' },
  { name: 'Anime', href: '/anime' },
];

const App = () => {
  return (
    <div className={style.App}>
      <Box className={style.navbar}>
        <nav>
          <List>
            {navbarItem.map(item => (
              <ListItem disablePadding key={item.name} divider sx={{ justifyContent: 'center' }}>
                <Link to={item.href} className={style.link}>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
      <main className={style.main}>
        <Switch>
          <Route exact path="/">
            <Profile />
          </Route>
          <Route path="/dialogs">
            <Dialogs />
          </Route>
          <Route path="/anime">
            <Anime />
          </Route>
        </Switch>
      </main>
      <Spinner fullPage />
    </div>
  );
};

export default App;
