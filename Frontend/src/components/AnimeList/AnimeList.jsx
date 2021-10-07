import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import ReactHtmlParser from 'react-html-parser';
import PropsTypes from 'prop-types';

import style from './AnimeList.module.scss';

const AnimeList = ({ animeList }) => {
  return (
    <div className={style.wrapper}>
      {animeList?.map(el => (
        <div
          key={el.id}
          className={style.card}
          style={{ backgroundColor: el?.cover_color || 'purple' }}
        >
          <div className={style.bannerWrap}>
            <img
              src={el.banner_image}
              alt={el.titles?.en || el.titles.jp}
              className={style.cardImg}
            />
            {el.trailer_url ? (
              <div className={style.overlay}>
                <a target="_blank" rel="noreferrer" href={el?.trailer_url}>
                  play trailer
                </a>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={style.cardContent}>
            <h2 className={style.cardTitle}>{el.titles?.en || el.titles.jp}</h2>
            <Swiper spaceBetween={10} slidesPerView={1}>
              {el.genres?.map(genre => (
                <SwiperSlide key={genre}>
                  <span className={style.genreCard}>{genre}</span>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={style.cardDescription}>
              {ReactHtmlParser(el.descriptions?.en || 'Not description')}
            </div>
            <span>Количество серий: {el?.episodes_count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

AnimeList.propsTypes = {
  animeList: PropsTypes.array.isRequired,
};

export default AnimeList;
