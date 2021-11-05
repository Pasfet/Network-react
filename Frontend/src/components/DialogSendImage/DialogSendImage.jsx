import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import { DialogButton, InfoFile, Input, SendButton, UploadButton } from './DialogSendImageStyled';

const DialogSendImage = ({
  open,
  handleClose,
  title,
  text,
  sendAvatar,
  formAvatar,
  fileInfo,
  setFileInfo,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose(false);
        setFileInfo(null);
      }}
    >
      <DialogTitle> {title} </DialogTitle>
      {fileInfo && <InfoFile severity="info"> Название файла: {fileInfo?.name} </InfoFile>}
      <form onSubmit={e => sendAvatar(e)} data-testid="dialog-image-form">
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <label htmlFor="dialogSendInput">
            <Input
              accept="image/*"
              id="dialogSendInput"
              type="file"
              name="avatar"
              ref={formAvatar}
              onChange={e => setFileInfo(formAvatar.current.files[0])}
              data-testid="dialog-input-form"
            />
            <UploadButton variant="contained" component="span">
              Upload
            </UploadButton>
          </label>
        </DialogContent>
        <DialogActions>
          <DialogButton
            variant="contained"
            onClick={() => {
              handleClose(false);
              setFileInfo(null);
            }}
          >
            Закрыть
          </DialogButton>
          <SendButton variant="contained" type="submit">
            Загрузить
          </SendButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

DialogSendImage.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
  sendAvatar: PropTypes.func,
  fileInfo: PropTypes.object,
  setFileInfo: PropTypes.func,
};

export default DialogSendImage;
