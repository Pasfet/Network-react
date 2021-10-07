import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../HOC/PrivateRoute';
import LogInContainer from '../../pages/LogInContainer/LogInContainer';
import ProfileContainer from '../../pages/ProfileContainer/ProfileContainer';
import Dialogs from '../../pages/Dialogs/Dialogs';
import Anime from '../../pages/Anime/Anime';

import PropTypes from 'prop-types';
import SignUpContainer from '../../pages/SignUpContainer/SignUpContainer';

const Routes = ({ authed }) => {
  return (
    <Switch>
      <Route authenticated={authed} exact path="/login">
        <LogInContainer />
      </Route>
      <Route authenticated={authed} exact path="/signup">
        <SignUpContainer />
      </Route>
      <Route authenticated={authed} path="/profile/:uid">
        <ProfileContainer />
      </Route>
      <PrivateRoute authenticated={authed} path="/dialogs">
        <Dialogs />
      </PrivateRoute>
      <Route authenticated={authed} exact path="/anime">
        <Anime />
      </Route>
    </Switch>
  );
};

Routes.propsTypes = {
  authed: PropTypes.bool.isRequired,
};

export default Routes;
