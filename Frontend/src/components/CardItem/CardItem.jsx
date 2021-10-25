import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { CardButton, CardTitle, CardWrapper, CartDescription } from './CardItemStyled';

const CardItem = ({ post }) => {
  return (
    <CardWrapper>
      <CardMedia component="img" height="500" image={post?.urlToImage} alt={post?.title} />
      <CardContent>
        <CardTitle variant="h2">{post?.title}</CardTitle>
        <Typography variant="body1">{ReactHtmlParser(post?.description)}</Typography>
        <CartDescription variant="subtitle1"> {post.source?.name} </CartDescription>
      </CardContent>
      <CardActions>
        <CardButton size="small" variant="contained" href={post.url}>
          Перейти к статье
        </CardButton>
      </CardActions>
    </CardWrapper>
  );
};

CardItem.propTypes = {
  post: PropTypes.object,
};

export default memo(CardItem);
