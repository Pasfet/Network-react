import { Paper } from '@mui/material';
import {
  ErrorMessage,
  ProfileEditBox,
  ProfileEditHeading,
  ProfileEditInput,
  ProfileEditItem,
  ProfileEditList,
  ProfileEditSave,
  ProfileEditText,
  ProfileEditWrapper,
} from './ProfileEditTableStyled';
import PropTypes from 'prop-types';

const ProfileEditTable = ({
  birthday,
  setBirthday,
  city,
  setCity,
  site,
  setSite,
  language,
  setLanguage,
  sendAbout,
  error,
}) => {
  return (
    <ProfileEditWrapper container>
      <div>
        <ProfileEditHeading>Редактировать профиль</ProfileEditHeading>
        {error && <ErrorMessage severity="error"> {error} </ErrorMessage>}
        <ProfileEditBox component={Paper}>
          <ProfileEditList>
            <ProfileEditItem>
              <ProfileEditText>Дата рождения</ProfileEditText>
              <ProfileEditInput
                placeholder="Дата рождения"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                InputProps={{ 'data-testid': 'birthdayInput' }}
              />
            </ProfileEditItem>
            <ProfileEditItem>
              <ProfileEditText>Город</ProfileEditText>
              <ProfileEditInput
                placeholder="Город"
                value={city}
                onChange={e => setCity(e.target.value)}
                InputProps={{ 'data-testid': 'cityInput' }}
              />
            </ProfileEditItem>
            <ProfileEditItem>
              <ProfileEditText>Ваш сайт</ProfileEditText>
              <ProfileEditInput
                placeholder="Ваш сайт"
                value={site}
                onChange={e => setSite(e.target.value)}
                InputProps={{ 'data-testid': 'siteInput' }}
              />
            </ProfileEditItem>
            <ProfileEditItem>
              <ProfileEditText>Языки</ProfileEditText>
              <ProfileEditInput
                placeholder="Языки"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                InputProps={{ 'data-testid': 'langInput' }}
              />
            </ProfileEditItem>
            <ProfileEditItem>
              <ProfileEditSave onClick={() => sendAbout()}>Сохранить</ProfileEditSave>
            </ProfileEditItem>
          </ProfileEditList>
        </ProfileEditBox>
      </div>
    </ProfileEditWrapper>
  );
};

ProfileEditTable.propsTypes = {
  birthday: PropTypes.string,
  setBirthday: PropTypes.func,
  city: PropTypes.string,
  setCity: PropTypes.func,
  language: PropTypes.string,
  setLanguage: PropTypes.func,
  sendAbout: PropTypes.func,
  error: PropTypes.string,
};

export default ProfileEditTable;
