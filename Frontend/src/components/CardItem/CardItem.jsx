import { CardActions, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  CardButton,
  CardImgWrapper,
  CardTitle,
  CardWrapper,
  CartDescription,
} from './CardItemStyled';

const CardItem = ({ post }) => {
  return (
    <CardWrapper>
      <CardImgWrapper component="img" height="500" image={post?.image} alt={post?.title} />
      <CardContent>
        <CardTitle variant="h2">{post?.title}</CardTitle>
        <Typography variant="body1">{ReactHtmlParser(post?.description)}</Typography>
        <CartDescription variant="subtitle1"> {post?.source} </CartDescription>
      </CardContent>
      <CardActions>
        <CardButton size="small" variant="contained" href={post?.url} target="_blank">
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
