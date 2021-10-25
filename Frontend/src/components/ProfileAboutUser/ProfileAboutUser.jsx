import { Table, TableBody, TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { ProfileAboutContainer, ProfileAboutRow } from './ProfileAboutUserStyled';

const ProfileAboutUser = ({ about }) => {
  return (
    <ProfileAboutContainer>
      <Table aria-label="О себе">
        <TableBody>
          {about &&
            Object.keys(about)?.map(item => (
              <ProfileAboutRow key={item} hover>
                <TableCell>{about[item].text}</TableCell>
                <TableCell>
                  {about[item].payload ? about[item].payload : 'Ничего не задано'}
                </TableCell>
              </ProfileAboutRow>
            ))}
        </TableBody>
      </Table>
    </ProfileAboutContainer>
  );
};

ProfileAboutUser.propsTypes = {
  about: PropTypes.object.isRequired,
};

export default memo(ProfileAboutUser);
