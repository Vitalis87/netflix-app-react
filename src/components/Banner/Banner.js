import React, { useState, useEffect } from 'react';
import axios from '../../tmbd-api/axios';
import requests from '../../tmbd-api/requests';
import css from './Banner.module.css';

function Banner() {
  const [randomMovie, setRandomMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setRandomMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ],
      );
    };
    fetchData();
  }, []);

  return (
    <header
      className={css.banner}
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${randomMovie?.backdrop_path}")`,
        backdropPosition: 'center center',
      }}
    >
      <div className={css.bannerContents}>
        <h2 className={css.bannerTitle}>
          {randomMovie?.title ||
            randomMovie?.name ||
            randomMovie?.original_name}
        </h2>

        <div className="banner__buttons">
          <button type="button" className={css.bannerButton}>
            Play
          </button>
          <button type="button" className={css.bannerButton}>
            My List
          </button>
        </div>

        <h3 className={css.bannerDescription}>{randomMovie?.overview}</h3>
      </div>

      <div className={css.bannerFadeBottom} />
    </header>
  );
}

export default Banner;
