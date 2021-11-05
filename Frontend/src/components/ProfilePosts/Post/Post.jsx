import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { CURRENT_URL } from '../../../store/types/authTypes';

import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CardHeaderStyled = styled(CardHeader)({
  '& .MuiCardHeader-title': {
    textTransform: 'capitalize',
    fontSize: '18px',
  },
});

const CardHeaderLink = styled(Link)({
  color: '#000',
});

const Post = ({ post, myUid, uid, deletePost }) => {
  return (
    <Card sx={{ margin: '20px 0' }}>
      <CardHeaderStyled
        avatar={
          <Avatar
            sx={{ width: '60px', height: '60px' }}
            src={`${CURRENT_URL}/images?uid=${post.author_uid}`}
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

Post.propTypes = {
  post: PropTypes.object,
  myUid: PropTypes.string,
  uid: PropTypes.string,
  deletePost: PropTypes.func,
};

export default Post;
