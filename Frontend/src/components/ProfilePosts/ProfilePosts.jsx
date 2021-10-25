import { memo } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@mui/material';
import { ErrorMessage, FormButton, PostsForm, PostsInput } from './ProfilePostsStyled';
import Post from './Post/Post';

const ProfilePosts = ({
  userPosts,
  error,
  setPostValue,
  postValue,
  addPost,
  myUid,
  uid,
  deletePost,
}) => {
  return (
    <div>
      <PostsForm onSubmit={e => addPost(e)}>
        <PostsInput
          placeholder="Введите сообщение поста"
          value={postValue}
          onChange={e => setPostValue(e.target.value)}
        />
        <FormButton variant="contained" type="submit">
          Отправить
        </FormButton>
      </PostsForm>
      <Divider />
      {error && <ErrorMessage severity="info"> {error} </ErrorMessage>}
      {userPosts?.map(post => (
        <Post post={post} key={post.id} myUid={myUid} uid={uid} deletePost={deletePost} />
      ))}
    </div>
  );
};

ProfilePosts.propTypes = {
  userPosts: PropTypes.array,
  error: PropTypes.string,
  postValue: PropTypes.string,
  setPostValue: PropTypes.func,
  addPost: PropTypes.func,
  myUid: PropTypes.string,
  uid: PropTypes.string,
  deletePost: PropTypes.func,
};

export default memo(ProfilePosts);
