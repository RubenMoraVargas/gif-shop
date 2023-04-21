import  { useSelector }  from  'react-redux';

import  { selectGifs }  from  '../reducers/gifReducer';

import  { Gif }  from  '../types/gif';

  

export  const  GifList  =  ()  =>  {

const  gifs  =  useSelector(selectGifs);

  

return (

<div>

{gifs.map((gif:  Gif) => (

<img  key={gif.id} src={gif.url} alt={gif.title} />

))}

</div>

);

};