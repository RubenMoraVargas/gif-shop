
import { setGifs } from "../reducers/gif-reducer/gifReducer";
import { DispatchType } from "../reducers/cart-reducer/cartReducer";
import { gifProvider } from '../provider/gif.provider';


export const startSetGif = (searchTerm: string):any => {
  return async (dispatch: DispatchType) => { 
      const gifList = await gifProvider(searchTerm);
      
    dispatch(setGifs(gifList || []));
     
   
  };
};
