import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {   selectGifs } from '@/root/redux/reducers/gif-reducer/gifReducer';
  
import { Gif } from '@/root/types/Gif.type';
import { startSetGif } from '@/root/redux/thunks/gif.thunk';
import { RootState } from '@/root/redux/store';
import GifItem from '@/root/components/gif-item/GifItem';
import SearchBar from './../root/components/search-bar/SearchBar';

const promotionPrice = 79.79;
const Home = () => {
  const dispatch = useDispatch();
  const gifs = useSelector<RootState,Gif[]>(state => state.gif.gifs);
console.log(gifs);

  useEffect(() => {
    dispatch(startSetGif('dogs'));
  }, [dispatch]);

  return (
    <div className="container"> 
      <h1 className="text-center font-bold text-4xl my-12">Gif Market</h1>
      <SearchBar/>
      <div className="grid grid-cols-3 gap-4">
        {gifs.map((gif: Gif) => (
          <GifItem key={gif.id} title={gif.title} gifImageUrl={gif.url} price={ promotionPrice} />
             
        ))}
      </div>
    </div>
  );
};

export default Home;