const PostRandomId = () => {
  const postId = () => {
    return (Math.floor((1 + Math.random()) * 0x50000000).toString(16)).substring(1);
  }
  return postId() + '_' + postId();
}

const createPost = ({author_name, text, author_avatar, author_uid}, id) => ({
  id,
  author_name,
  text,
  author_avatar,
  author_uid,
});

module.exports = {createPost, PostRandomId}