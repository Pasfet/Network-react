import { Route, Redirect } from 'react-router-dom';

const WithAuthForm = ({ authenticated, ...props }) => {
  return authenticated ? <Redirect to="/" /> : <Route {...props} />;
};

export default WithAuthForm;
