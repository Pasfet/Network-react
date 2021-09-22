import style from './App.module.scss';
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Dialogs from './pages/Dialogs/Dialogs';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';


const navbarItem = [
  { name: 'Profile', href: '/' },
  { name: 'Messages', href: '/dialogs' }
]

const App = () => {
  return (
    <div className={style.App}>
      <Box className={style.navbar}>
        <nav>
          <List>
            {navbarItem.map(item => (
              <ListItem disablePadding key={item.name} divider sx={{justifyContent: 'center'}}>
                <Link to={item.href} className={style.link}>
                  <ListItemButton sx={{textAlign: 'center'}}>
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
        </Switch>
      </main>
    </div>
  );
};

export default App;
