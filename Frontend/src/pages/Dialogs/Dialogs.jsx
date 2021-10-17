import { useSelector } from 'react-redux';

import { styled } from '@material-ui/styles';

import PrivateRoute from '../../HOC/PrivateRoute';
import ChatsContainer from '../../components/ChatsContainer/ChatsContainer';

import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import { getAuth } from '../../store/auth/authSelector';

const DialogsWrap = styled('div')({
  width: '100%',
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '45px',
  '@media(max-width: 430px)': {
    padding: '15px',
  },
});

const Dialogs = () => {
  const auth = useSelector(getAuth);
  return (
    <DialogsWrap>
      <PrivateRoute authenticated={auth} exact path="/dialogs/:uid/">
        <ChatsContainer />
      </PrivateRoute>

      <PrivateRoute authenticated={auth} exact path="/dialogs/:uid/:chatId">
        <MessagesContainer />
      </PrivateRoute>
    </DialogsWrap>
  );
};

export default Dialogs;
