import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGifsAsync, selectGifs } from '../reducers/gifReducer';
import { Gif } from '../types';

const Home = () => {
  const dispatch = useDispatch();
  const gifs = useSelector(selectGifs);

  useEffect(() => {
    dispatch(fetchGifsAsync());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Gifs</h1>
      <div className="gifs">
        {gifs.map((gif: Gif) => (
          <div
            key={gif.id}
            className="gif"
            style={{ backgroundImage: `url(${gif.url})` }}
          >
            <div className="title">{gif.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;