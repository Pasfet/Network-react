import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changePage, getAllAnime, searchAnime } from '../../actions/animePageAction';

import {
  getAnimeFromStore,
  getCountAnime,
  getError,
  getLastPage,
} from '../../store/animeReducer/animeSelector';

import AnimeList from '../../components/AnimeList/AnimeList';
import Pagination from '../../components/Pagination/Pagination';
import SearchInput from '../../components/SearchInput/SearchInput';
import useDebounce from '../../hooks/debounce/debounce';

const Anime = () => {
  const animeList = useSelector(getAnimeFromStore);
  const lastPage = useSelector(getLastPage);
  const countAnime = useSelector(getCountAnime);
  const error = useSelector(getError);

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const debounce = useDebounce(searchValue, 1000);

  const changePageHandler = pageNumber => {
    dispatch(changePage(pageNumber, debounce));
    setPage(pageNumber);
  };

  const retryFetch = () => {
    dispatch(getAllAnime(page, debounce));
  };

  useEffect(() => {
    if (debounce) {
      dispatch(searchAnime(debounce));
      setPage(1);
    } else {
      dispatch(getAllAnime(page, debounce));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  if (error) {
    return (
      <>
        <h3>Что-то пошло не так</h3>
        <button onClick={retryFetch}>Повторить</button>
      </>
    );
  }

  return (
    <>
      <SearchInput placeholder={'Поиск аниме'} margin={'normal'} changeHandler={setSearchValue} />
      <Pagination
        lastPage={lastPage}
        countAnime={countAnime}
        currentPage={page}
        changePageHandler={changePageHandler}
      />
      <AnimeList animeList={animeList} />
    </>
  );
};

export default Anime;
