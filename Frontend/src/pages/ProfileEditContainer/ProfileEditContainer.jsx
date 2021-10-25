import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getError } from '../../store/errorReducer/errorSelectors';
import { getMyUid, getUserProfile } from '../../store/profileReducer/profileSelectors';
import { sendProfileChange } from '../../actions/profileActions';
import ProfileEditTable from '../../components/ProfileEditTable/ProfileEditTable';

const ProfileEditContainer = () => {
  const dispatch = useDispatch();

  const { about } = useSelector(getUserProfile);
  const error = useSelector(getError);
  const myUid = useSelector(getMyUid);

  const [birthday, setBirthday] = useState(about.birthday?.payload);
  const [city, setCity] = useState(about.city?.payload);
  const [site, setSite] = useState(about.site?.payload);
  const [language, setLanguage] = useState(about.language?.payload);

  const sendAbout = () => {
    dispatch(
      sendProfileChange(myUid, {
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

export default ProfileEditContainer;
