import { Table, TableBody } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { ProfileAboutContainer, ProfileAboutRow, TableRowTitle } from './ProfileAboutUserStyled';

const ProfileAboutUser = ({ about }) => {
  return (
    <ProfileAboutContainer>
      <Table aria-label="О себе">
        <TableBody>
          {about &&
            Object.keys(about)?.map(item => (
              <ProfileAboutRow key={item} hover>
                <TableRowTitle>{about[item].text}</TableRowTitle>
                <TableRowTitle>
                  {about[item].payload ? about[item].payload : 'Ничего не задано'}
                </TableRowTitle>
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
