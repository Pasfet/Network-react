import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSnack } from '../../actions/errorActions';

const SnackbarAlert = ({ snackMessage }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    return () => dispatch(clearSnack);
  }, [snackMessage, dispatch]);

  return (
    <div>
      {snackMessage && (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackMessage?.result === 0 ? 'success' : 'error'}>
            {snackMessage?.text}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default SnackbarAlert;
