import { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../actions/errorActions';
import { getNewsAPI } from '../../actions/newsPageActions';
import { getNewsFromStore } from '../../store/newsReducer/newsSelectors';
import NewsList from './NewsList/NewsList';

const NewsContainer: FC = () => {
  const news = useSelector(getNewsFromStore);
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(10);

  const fetchMoreNews = (): void => {
    setPage(prevState => prevState + 10);
  };

  useEffect((): () => void => {
    dispatch(getNewsAPI(page));

    return () => dispatch(clearError());
  }, [dispatch, page]);

  return <NewsList news={news} fetchMoreNews={fetchMoreNews} />;
};

export default NewsContainer;
