import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DialogButton, InfoFile, Input, SendButton, UploadButton } from './DialogSendImageStyled';
import {FC} from 'react';
import {IDialogSendImageProps} from '../../types/components';

const DialogSendImage: FC<IDialogSendImageProps> = ({
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
            <UploadButton variant="contained">
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

export default DialogSendImage;