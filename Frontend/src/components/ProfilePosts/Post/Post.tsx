import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CURRENT_URL } from '../../../types/authTypes';

import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {FC} from 'react';
import { IPostsProps } from '../../../types/components';

const CardHeaderStyled = styled(CardHeader)({
  '& .MuiCardHeader-title': {
    textTransform: 'capitalize',
    fontSize: '1.2rem',
  },
});

const CardHeaderLink = styled(Link)({
  color: '#000',
  '@media(max-width: 420px)': {
    fontSize: '0.8rem',
  },
});

const Post: FC<IPostsProps> = ({ post, myUid, uid, deletePost }) => {
  return (
    <Card sx={{ margin: '20px 0' }}>
      <CardHeaderStyled
        avatar={
          <Avatar
            sx={{ width: '60px', height: '60px' }}
            src={`${CURRENT_URL}/images?uid=${post.author_uid}`}
            // @ts-ignore
            alt={post.author_name}
          />
        }
        action={
          myUid === post.author_uid || myUid === uid ? (
            <IconButton onClick={() => deletePost(post.id)} data-testid="deletePostButton">
              <DeleteIcon />
            </IconButton>
          ) : null
        }
        title={
          <CardHeaderLink to={`/profile/${post.author_uid}`}>{post.author_name}</CardHeaderLink>
        }
        sx={{ textTransform: 'capitalize' }}
      />
      <CardContent>
        <Typography variant="body2">{post.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
