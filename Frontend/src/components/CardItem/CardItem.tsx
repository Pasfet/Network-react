import { CardActions, CardContent, Typography } from '@mui/material';
import { memo, FC } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ICardItemProps } from '../../types/components';

import {
  CardButton,
  CardImgWrapper,
  CardTitle,
  CardWrapper,
  CartDescription,
} from './CardItemStyled';

const CardItem: FC<ICardItemProps> = ({ post }) => {
  return (
    <CardWrapper>
      {/* @ts-ignore} */}
      <CardImgWrapper component="img" height="500" image={post?.image} alt={post?.title} />
      <CardContent>
        <CardTitle variant="h2">{post?.title}</CardTitle>
        <Typography variant="body1">{ReactHtmlParser(post?.description)}</Typography>
        <CartDescription variant="subtitle1"> {post?.source} </CartDescription>
      </CardContent>
      <CardActions>
        {/* @ts-ignore} */}
        <CardButton size="small" variant="contained" href={post?.url} target="_blank">
          Перейти к статье
        </CardButton>
      </CardActions>
    </CardWrapper>
  );
};

export default memo(CardItem);
