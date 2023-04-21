import  axios  from  'axios';

import  { Gif }  from  '../types/gif';

  

const  API_KEY  =  'YOUR_API_KEY';

  

export  const  fetchGifs  =  async  (searchTerm:  string): Promise<Gif[]>  =>  {

const  response  =  await  axios.get(

`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=20`

);

const  gifs  =  response.data.data.map((gif:  any) => ({

id:  gif.id,

title:  gif.title,

url:  gif.images.downsized_medium.url,

}));

return  gifs;

};