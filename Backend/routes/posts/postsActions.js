const { createPost, PostRandomId } = require("./postsHelpers");

const getPosts = (posts, req) => {
  const {uid} = req.query;

  if (!posts[uid] || !posts[uid].length) return null;

  return posts[uid];
}

const writePost = (posts, req) => {
  const {uid} = req.query;
  const {post} = req.body;

  console.log(post)
  const randomId = PostRandomId();
  const newPost = createPost(post, randomId);


  if (!posts[uid]) {
    return  JSON.stringify({
      ...posts,
      [uid]: [
        newPost
      ]
    }, null, 2);
  }

  return JSON.stringify({
    ...posts,
    [uid]: [newPost, ...posts[uid]]
  }, null, 2);
}

const deletePost = (posts, req) => {
  const {uid} = req.query;
  const {postId} = req.body;

  if (!posts[uid]) return null;

  return JSON.stringify({
    ...posts,
    [uid]: posts[uid].filter(post => post.id !== postId)
  }, null, 2)
}

module.exports = {
  getPosts,
  writePost,
  deletePost
}