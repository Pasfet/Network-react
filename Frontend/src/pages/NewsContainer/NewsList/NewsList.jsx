import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import CardItem from '../../../components/CardItem/CardItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../../components/Spinner/Spinner';

const NewsList = ({ news, fetchMoreNews }) => {
  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <InfiniteScroll
        dataLength={news.length}
        next={fetchMoreNews}
        hasMore={true}
        loader={<Spinner fullPage={true} />}
      >
        {news?.map(post => (
          <CardItem key={post.title} post={post} />
        ))}
      </InfiniteScroll>
    </Grid>
  );
};

NewsList.propTypes = { news: PropTypes.array, fetchMoreNews: PropTypes.func };

export default NewsList;
