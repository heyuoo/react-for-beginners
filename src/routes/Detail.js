import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      console.log(json);
      setMovie(json.data.movie);
      setLoading(false);
    };
    getMovie();
  }, [id]); // id가 변경될 때만 실행

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          <img
            src={movie.large_cover_image}
            alt={movie.title}
            className={styles.movie__img}
          />
          <div className={styles.movie__info}>
            <h2 className={styles.movie__title}>{movie.title}</h2>
            <h3 className={styles.movie__year}>{movie.year}</h3>
            <p className={styles.movie__description}>
              {movie.description_full}
            </p>
            <ul className={styles.movie__genres}>
              {movie.genres?.map((genre) => {
                // 장르 이름에 공백이 있을 경우 "-"로 변환 (CSS 클래스명으로 사용 가능하도록)
                const genreClass =
                  styles[`genre-${genre.replace(/\s+/g, "-")}`] ||
                  styles["genre-default"];
                return (
                  <li key={genre} className={genreClass}>
                    {genre}
                  </li>
                );
              }) || (
                <li className={styles["genre-default"]}>No genres available</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
