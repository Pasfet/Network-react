export const getAnimeFromStore = state => state.animePage.animeList.documents;
export const getCountAnime = state => state.animePage.animeList.count;
export const getCurrentPage = state => state.animePage.animeList.current_page;
export const getLastPage = state => state.animePage.animeList.last_page;
export const getSearchValue = state => state.animePage.searchTitle;
export const getError = state => state.animePage.error;
