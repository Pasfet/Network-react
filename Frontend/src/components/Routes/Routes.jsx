import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Page404 from '../../pages/404/Page404';
import PrivateRoute from '../../HOC/PrivateRoute';
import WithAuthForm from '../../HOC/WithAuthForm';
import Spinner from '../Spinner/Spinner';

const LogInContainer = lazy(() => import('../../pages/LogInContainer/LogInContainer'));
const ProfileContainer = lazy(() => import('../../pages/ProfileContainer/ProfileContainer'));
const Dialogs = lazy(() => import('../../pages/Dialogs/Dialogs'));
const SignUpContainer = lazy(() => import('../../pages/SignUpContainer/SignUpContainer'));
const ProfileEditContainer = lazy(() =>
  import('../../pages/ProfileEditContainer/ProfileEditContainer'),
);
const UserFriendsContainer = lazy(() =>
  import('../../pages/UserFriendsContainer/UserFriendsContainer'),
);
const MyFriendsContainer = lazy(() => import('../../pages/MyFriendsContainer/MyFriendsContainer'));
const UsersListContainer = lazy(() => import('../../pages/UsersListContainer/UsersListContainer'));
const NewsContainer = lazy(() => import('../../pages/NewsContainer/NewsContainer'));

const Routes = ({ authed }) => {
  return (
    <Suspense fallback={<Spinner fullPage={true} />}>
      <Switch>
        <Route exact path="/">
          <NewsContainer />
        </Route>
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
        <Route exact path="/profile/:uid/friends">
          <UserFriendsContainer />
        </Route>
        <PrivateRoute authenticated={authed} path="/friends/:uid">
          <MyFriendsContainer />
        </PrivateRoute>
        <PrivateRoute authenticated={authed} exact path="/users">
          <UsersListContainer />
        </PrivateRoute>
        <PrivateRoute authenticated={authed} path="/dialogs">
          <Dialogs />
        </PrivateRoute>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Suspense>
  );
};

Routes.propsTypes = {
  authed: PropTypes.bool.isRequired,
};

export default Routes;
