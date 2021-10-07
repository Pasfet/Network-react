import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

// import style from './Profile.module.scss';

const Profile = ({ user, error }) => {
  return (
    <div>
      {error && <Alert> {error} </Alert>}
      Имя: {user?.name}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default Profile;
