import { Route, Redirect } from 'react-router-dom';

const PriveRoute = ({ authenticated, ...props }) => {
  return authenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PriveRoute;
