import { Grid } from '@mui/material';
import CardItem from '../../../components/CardItem/CardItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../../components/Spinner/Spinner';
import {FC} from 'react';
import { INewsListProps } from '../../../types/components';

const NewsList: FC<INewsListProps> = ({ news, fetchMoreNews }) => {
  return (
    <Grid container sx={{ justifyContent: 'center', padding: '0 15px' }}>
      {news?.length ? (
        <InfiniteScroll
          dataLength={news.length}
          next={fetchMoreNews}
          hasMore={true}
          loader={<Spinner fullPage={true} />}
        >
          {news?.map(post => (
            <CardItem key={post.published_at} post={post} />
          ))}
        </InfiniteScroll>
      ) : (
        <p>
          К сожалению, news API для production версии платный, поэтому можно использовать локальную
          версию
        </p>
      )}
    </Grid>
  );
};

export default NewsList;
