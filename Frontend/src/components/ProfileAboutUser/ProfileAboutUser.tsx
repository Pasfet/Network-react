import { Table, TableBody } from '@mui/material';
import { memo, FC } from 'react';
import { IProfileAboutUserProps } from '../../types/components';
import { ProfileAboutContainer, ProfileAboutRow, TableRowTitle } from './ProfileAboutUserStyled';

const ProfileAboutUser: FC<IProfileAboutUserProps> = ({ about }) => {
  return (
    <ProfileAboutContainer>
      <Table aria-label="О себе">
        <TableBody>
          {about &&
            Object.keys(about)?.map((item: string) => (
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

export default memo(ProfileAboutUser);