import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Page404 from '../../pages/404/Page404';
import PrivateRoute from '../../HOC/PrivateRoute';
import LogInContainer from '../../pages/LogInContainer/LogInContainer';
import ProfileContainer from '../../pages/ProfileContainer/ProfileContainer';
import Dialogs from '../../pages/Dialogs/Dialogs';
import SignUpContainer from '../../pages/SignUpContainer/SignUpContainer';
import WithAuthForm from '../../HOC/WithAuthForm';
import ProfileEditContainer from '../../pages/ProfileEditContainer/ProfileEditContainer';
import UserFriendsContainer from '../../pages/UserFriendsContainer/UserFriendsContainer';
import MyFriendsContainer from '../../pages/MyFriendsContainer/MyFriendsContainer';

const Routes = ({ authed }) => {
  return (
    <Switch>
      <WithAuthForm authenticated={authed} exact path="/login">
        <LogInContainer />
      </WithAuthForm>
      <WithAuthForm authenticated={authed} exact path="/signup">
        <SignUpContainer />
      </WithAuthForm>
      <PrivateRoute authenticated={authed} exact path="/profile/:uid">
        <ProfileContainer />
      </PrivateRoute>
      <PrivateRoute authenticated={authed} path="/profile/:uid/edit">
        <ProfileEditContainer />
      </PrivateRoute>
      <PrivateRoute authenticated={authed} path="/dialogs">
        <Dialogs />
      </PrivateRoute>
      <PrivateRoute authenticated={authed} path="/friends/:uid">
        <MyFriendsContainer />
      </PrivateRoute>
      <Route exact path="/profile/:uid/friends">
        <UserFriendsContainer />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};

Routes.propsTypes = {
  authed: PropTypes.bool.isRequired,
};

export default Routes;
