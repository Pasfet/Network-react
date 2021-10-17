import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getError } from '../../store/errorReducer/errorSelector';
import { getUid, getUserPage } from '../../store/profileReducer/profileSelector';
import ProfileEditTable from '../../components/ProfileEditTable/ProfileEditTable';
import { setAboutUser } from '../../actions/profileActions';

const ProfileEdit = () => {
  const { about } = useSelector(getUserPage);
  const [birthday, setBirthday] = useState(about.birthday?.payload);
  const [city, setCity] = useState(about.city?.payload);
  const [site, setSite] = useState(about.site?.payload);
  const [language, setLanguage] = useState(about.language?.payload);
  const error = useSelector(getError);
  const uid = useSelector(getUid);
  const dispatch = useDispatch();

  const sendAbout = () => {
    dispatch(
      setAboutUser(uid, {
        about: {
          birthday: { text: 'День рождения', payload: birthday },
          city: { text: 'Город', payload: city },
          site: { text: 'Ваш сайт', payload: site },
          language: { text: 'Языки', payload: language },
        },
      }),
    );
  };
  return (
    <ProfileEditTable
      birthday={birthday ? birthday : ''}
      setBirthday={setBirthday}
      city={city ? city : ''}
      setCity={setCity}
      site={site ? site : ''}
      setSite={setSite}
      language={language ? language : ''}
      setLanguage={setLanguage}
      sendAbout={sendAbout}
      error={error && error.message}
    />
  );
};

export default ProfileEdit;
