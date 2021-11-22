import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { spinnerState } from '../../store/SpinnerReducer/spinnerSelectors';
import { styled } from '@mui/material/styles';

const SpinnerWrapper = styled('div')({
  '&.fullPage': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  
  '&.display': {
    display: 'flex'
  }
})

const Spinner = ({ fullPage = false }) => {
  const display = useSelector(spinnerState);
  return (
    <SpinnerWrapper className={`${fullPage && 'fullPage'} ${display && 'display'}`}>
      <CircularProgress disableShrink size={72} />
    </SpinnerWrapper>
  );
};

export default Spinner;
