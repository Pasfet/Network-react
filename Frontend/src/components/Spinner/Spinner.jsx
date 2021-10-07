import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { spinnerState } from '../../store/SpinnerReducer/spinnerSelector';
import style from './Spinner.module.scss';

const Spinner = ({ fullPage = false }) => {
  const display = useSelector(spinnerState);
  return (
    <div className={`${fullPage && style.fullPage} ${display && style.display}`}>
      <CircularProgress disableShrink size={72} />
    </div>
  );
};

export default Spinner;
