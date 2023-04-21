import  { store }  from  '../store';

import  { fetchGifsAsync,  setGifs }  from  './gifReducer';

  

describe('gif reducer',  ()  =>  {

it('should set gifs', () => {

const  gifs  = [{ id:  '1',  title:  'gif 1',  url:  'https://example.com/1.gif' }];

store.dispatch(setGifs(gifs));

const  state  =  store.getState().gif;

expect(state.gifs).toEqual(gifs);

});

  

it('should fetch gifs',  async () => {

const  gifs  = [{ id:  '1',  title:  'gif 1',  url:  'https://example.com/1.gif' }];

const  fetchMock  =  jest.fn(() =>  Promise.resolve({ data:  gifs }));

const  dispatchMock  =  jest.fn();

await  fetchGifsAsync()(dispatchMock,  null, { fetch:  fetchMock });

expect(fetchMock).toHaveBeenCalled();

expect(dispatchMock).toHaveBeenCalledWith(setGifs(gifs));

});

});
