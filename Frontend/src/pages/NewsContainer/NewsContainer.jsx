import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../actions/errorActions';
import { getNewsAPI } from '../../actions/newsPageActions';
import { getNewsFromStore } from '../../store/newsReducer/newsSelectors';
import NewsList from './NewsList/NewsList';

const NewsContainer = () => {
  const news = useSelector(getNewsFromStore);
  const dispatch = useDispatch();

  const [page, setPage] = useState(10);

  const fetchMoreNews = () => {
    setPage(prevState => prevState + 10);
  };

  useEffect(() => {
    dispatch(getNewsAPI(page));

    return () => dispatch(clearError());
  }, [dispatch, page]);

  return <NewsList news={news} fetchMoreNews={fetchMoreNews} />;
};

export default NewsContainer;
