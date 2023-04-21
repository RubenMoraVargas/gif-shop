
A continuación te muestro una guía para crear una aplicación con redux en Next.js, utilizando TypeScript, Tailwind, Functional components y pruebas unitarias con RTL y Jest.

  

##  Paso 1: Configuración del entorno de desarrollo

  

Antes de empezar, necesitarás tener instalado Node.js y un editor de código de tu elección. Luego, puedes crear un nuevo proyecto de Next.js con TypeScript y TailwindCSS ejecutando el siguiente comando en la terminal:

  

```dsconfig

npx create-next-app gif-shop-app --ts --tailwind --eslint --src-dir --import-alias "@/*"

  

```

  

Este comando creará una nueva aplicación de Next.js con TypeScript y TailwindCSS configurados.

  

##  Paso 2: Instalar Redux

  

Para instalar Redux, ejecuta el siguiente comando en la terminal:

  

```

npm install redux react-redux @reduxjs/toolkit redux-thunk

  

```

  

Este comando instalará Redux, React-Redux, Redux Toolkit y Redux Thunk en tu proyecto.

  

##  Paso 3: Crear el store

  

Crea un archivo llamado `src/root/redux/store.ts` y agrega el siguiente código:

  

```typescript

import  { configureStore }  from  '@reduxjs/toolkit';

import  thunkMiddleware  from  'redux-thunk';

import  { gifReducer }  from  './reducers/gifReducer';

  

export  const  store  =  configureStore({

reducer:  {

gif: gifReducer,

},

middleware:  [thunkMiddleware],

});

  

export  type RootState = ReturnType<typeof store.getState>;

export  type AppDispatch =  typeof store.dispatch;

  

```

  

Este archivo configurará el store de Redux para tu aplicación y lo exportará para que puedas acceder a él en otros archivos.

  

##  Paso 4: Crear los reducers

  

Crea un archivo llamado `src/root/redux/reducers/gifReducer.ts` en la carpeta `reducers` y agrega el siguiente código:

  

```typescript

import  { createSlice,  PayloadAction }  from  '@reduxjs/toolkit';

import  { AppDispatch,  RootState }  from  '../store';

import  { Gif }  from  '../types/gif';

import  { fetchGifs }  from  '../api/giphy';

  

interface GifState {

gifs: Gif[];

}

  

const  initialState: GifState =  {

gifs:  [],

};

  

export  const  gifSlice  =  createSlice({

name:  'gif',

initialState,

reducers:  {

setGifs:  (state,  action: PayloadAction<Gif[]>)  =>  {

state.gifs  =  action.payload;

},

},

});

  

export  const  {  setGifs  }  = gifSlice.actions;

  

export  const  fetchGifsAsync  =  (searchTerm:  string)  =>  {

return  async (dispatch:  AppDispatch) => {

const  gifs  =  await  fetchGifs(searchTerm);

dispatch(setGifs(gifs));

};

};

  

export  const  selectGifs  =  (state: RootState)  => state.gif.gifs;

  

export  const  gifReducer  = gifSlice.reducer;

  

```

  

Este archivo define el estado inicial y los reducers para el slice de `gif`. También exporta una función asíncrona `fetchGifsAsync` para llamar al API de Giphy y actualizar el estado de la aplicación.

  

##  Paso 5: Crear los componentes

  

Crea un componente llamado `/search-bar/SearchBar.tsx` en la carpeta `src/root/components` y agrega el siguiente código:

```typescript

import  { useState }  from  'react';

import  { useDispatch }  from  'react-redux';

import  { fetchGifsAsync }  from  '../reducers/gifReducer';

  

export  const  SearchBar  =  ()  =>  {

const  [searchTerm,  setSearchTerm]  =  useState('');

const  dispatch  =  useDispatch();

  

const  handleSearch  = (event:  React.FormEvent<HTMLFormElement>) => {

event.preventDefault();

dispatch(fetchGifsAsync(searchTerm));

setSearchTerm('');

};

  

return (

<form  onSubmit={handleSearch}>

<input

type="text"

value={searchTerm}

onChange={(event) => setSearchTerm(event.target.value)}

/>

<button  type="submit">Search</button>

</form>

);

};

  

```

  

Este componente es un formulario que permite al usuario buscar imágenes GIF en Giphy. Cuando se envía el formulario, se llama a la función `fetchGifsAsync` de Redux para obtener las imágenes correspondientes.

  

Crea un componente llamado `GifList.tsx` en la carpeta `components` y agrega el siguiente código:

```typescript

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

  

```

Este componente muestra una lista de imágenes GIF obtenidas a través de Redux.

  

Crea un componente llamado `root/components/cart/Cart.tsx` en la carpeta `components` y agrega el siguiente código:

```typescript

import  { useSelector }  from  'react-redux';

import  { selectCartItems }  from  '../reducers/cartReducer';

import  { CartItem }  from  './CartItem';

  

export  const  Cart  =  ()  =>  {

const  cartItems  =  useSelector(selectCartItems);

  

return (

<div>

<h2>Cart</h2>

{cartItems.length === 0 ? (

<p>Your  cart  is  empty</p>

) : (

cartItems.map((item) => <CartItem  key={item.id} item={item} />)

)}

</div>

);

};

  

```

Este componente muestra los elementos agregados al carrito de compras.

  

Crea un componente llamado `CartItem.tsx` en la carpeta `components` y agrega el siguiente código:

```typescript

import  { useDispatch }  from  'react-redux';

import  { removeCartItem }  from  '../reducers/cartReducer';

import  { CartItem  as  CartItemType }  from  '../types/cartItem';

  

interface CartItemProps {

item: CartItemType;

}

  

export  const  CartItem  =  ({  item  }: CartItemProps)  =>  {

const  dispatch  =  useDispatch();

  

const  handleRemove  = () => {

dispatch(removeCartItem(item.id));

};

  

return (

<div>

<p>{item.name}</p>

<p>{item.price}</p>

<button  onClick={handleRemove}>Remove</button>

</div>

);

};

  

```

Este componente muestra un elemento del carrito de compras y permite eliminarlo si se desea.

  

##  Paso 6: Integrar el API de Giphy

  

Crea un archivo llamado `giphy.ts` en la carpeta `api` y agrega el siguiente código:

```typescript

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

```

Este archivo define una función `fetchGifs` que llama al API de Giphy para obtener imágenes GIF basadas en un término de búsqueda.

  

##  Paso 7: Agregar el carrito de compras

  

Crea un archivo llamado `cartReducer.ts` en la carpeta `redux/reducers` y agrega el siguiente código:

```typescript

import  { createSlice,  PayloadAction }  from  '@reduxjs/toolkit';

import  { CartItem }  from  '../types/cartItem';

  

interface CartState {

items: CartItem[];

}

  

const  initialState: CartState =  {

items:  [],

};

  

export  const  cartSlice  =  createSlice({

name:  'cart',

initialState,

reducers:  {

addItem:  (state,  action: PayloadAction<CartItem>)  =>  {

const  item  =  action.payload;

const  existingItem  =  state.items.find((i) =>  i.id  ===  item.id);

if (existingItem) {

existingItem.quantity  +=  1;

} else {

state.items.push({ ...item,  quantity:  1 });

}

},

removeItem:  (state,  action: PayloadAction<string>)  =>  {

state.items  =  state.items.filter((item) =>  item.id  !==  action.payload);

},

},

});

  

export  const  {  addItem,  removeItem  }  = cartSlice.actions;

  

export  const  selectCartItems  =  (state:  any)  => state.cart.items;

  

export  const  cartReducer  = cartSlice.reducer;

  

```

Este archivo define el estado inicial y los reducers para el slice del carrito de compras. También exporta la función `selectCartItems` para obtener los elementos del carrito de compras.

  

Crea un componente llamado `AddToCartButton.tsx` en la carpeta `components` y agrega el siguiente código:

```typescript

import  { useDispatch }  from  'react-redux';

import  { addItem }  from  '../reducers/cartReducer';

import  { Item }  from  '../types/item';

  

interface AddToCartButtonProps {

item: Item;

}

  

export  const  AddToCartButton  =  ({  item  }: AddToCartButtonProps)  =>  {

const  dispatch  =  useDispatch();

  

const  handleAddToCart  = () => {

dispatch(addItem({ id:  item.id,  name:  item.name,  price:  item.price }));

};

  

return <button  onClick={handleAddToCart}>Add  to  cart</button>;

};

  

```

Este componente muestra un botón para agregar un elemento al carrito de compras.

  

##  Paso 8: Mostrar el carrito

Crea un componente llamado `CartMenu.tsx` en la carpeta `components` y agrega el siguiente código:

```typescript

import  { useState }  from  'react';

import  { useSelector }  from  'react-redux';

import  { selectCartItems }  from  '../reducers/cartReducer';

import  { Cart }  from  './Cart';

  

export  const  CartMenu  =  ()  =>  {

const  cartItems  =  useSelector(selectCartItems);

const  [isOpen,  setIsOpen]  =  useState(false);

  

const  handleToggle  = () => {

setIsOpen(!isOpen);

};

  

return (

<>

<button  onClick={handleToggle}>

Cart ({cartItems.length})

</button>

{isOpen && <Cart />}

</>

);

};

  

```

Este componente muestra un botón para abrir y cerrar el menú del carrito de compras. Cuando el menú está abierto, muestra el componente `Cart`.

  

##  Paso 9: Agregar pruebas unitarias

  

Crea un archivo llamado `gifReducer.test.ts` en la carpeta `reducers` y agrega el siguiente código:

```typescript

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

  

```

Este archivo contiene pruebas unitarias para el reducer de `gif`. La primera prueba verifica que el reducer establece correctamente los gifs. La segunda prueba verifica que la acción `fetchGifsAsync` realiza una solicitud HTTP y luego establece los gifs en el store.

  

Crea un archivo llamado `cartReducer.test.ts` en la carpeta `reducers` y agrega el siguiente código:

```typescript

import  { store }  from  '../store';

import  { addToCart,  removeFromCart }  from  './cartReducer';

  

describe('cart reducer',  ()  =>  {

it('should add an item to the cart', () => {

const  item  = { id:  '1',  title:  'item 1',  price:  10 };

store.dispatch(addToCart(item));

const  state  =  store.getState().cart;

expect(state.items).toContainEqual(item);

});

  

it('should remove an item from the cart', () => {

const  item  = { id:  '1',  title:  'item 1',  price:  10 };

store.dispatch(addToCart(item));

store.dispatch(removeFromCart(item.id));

const  state  =  store.getState().cart;

expect(state.items).not.toContainEqual(item);

});

});

  

```

Este archivo contiene pruebas unitarias para el reducer de `cart`. La primera prueba verifica que el reducer agrega correctamente un item al carrito de compras. La segunda prueba verifica que el reducer elimina correctamente un item del carrito de compras.

  

##  Paso 10: Agregar estilos

  

Crea un archivo llamado `App.css` en la carpeta `src` y agrega los siguientes estilos:

```css

.container  {

max-width:  800px;

margin:  0  auto;

padding:  0  20px;

}

  

.gifs  {

display:  grid;

grid-template-columns:  repeat(auto-fit,  minmax(200px,  1fr));

grid-gap:  20px;

}

  

.gif  {

position:  relative;

padding-bottom:  100%;

background-size:  cover;

background-repeat:  no-repeat;

background-position:  center;

cursor:  pointer;

}

  

.gif:hover  {

box-shadow:  0  0  5px  rgba(0,  0,  0,  0.3);

}

  

.gif  .title  {

position:  absolute;

bottom:  0;

left:  0;

right:  0;

padding:  10px;

background-color:  rgba(0,  0,  0,  0.7);

color:  white;

font-size:  16px;

font-weight:  bold;

}

  

.cart-items  {

margin-bottom:  20px;

}

  

.cart-item  {

display:  flex;

align-items:  center;

margin-bottom:  10px;

}

  

.cart-item  img  {

width:  50px;

height:  50px;

margin-right:  10px;

}

  

.cart-item  .title  {

flex:  1;

}

  

.cart-item  .price  {

font-weight:  bold;

}

  

.cart-total  {

display:  flex;

justify-content:  space-between;

align-items:  center;

font-weight:  bold;

}

  

```

Estos estilos definen la apariencia de la aplicación.

  

##  Paso 11: Ejecutar la aplicación

  

Ejecuta la aplicación con el siguiente comando:

```

npm start

  

```

Abre el navegador en `http://localhost:3000` para ver la aplicación en funcionamiento.

  

¡Felicidades! Has construido una aplicación web básica de compras que utiliza Redux para administrar el estado. Espero que esta guía haya sido útil para ti. Si tienes preguntas o comentarios, no dudes en preguntar. ¡Gracias por seguir esta guía!

  

Esta guía fue cocreada con ghatgpt utilizando la herramienta poe.com

Para editar markdown en tiempo real, se utilizo https://stackedit.io/app#

  

##  Fin


## Paso 1: Crear la página inicial

Crea un archivo llamado  `index.tsx`  en la carpeta  `pages`  y agrega el siguiente código:

typescript

Copy

```typescript
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

```

Este componente muestra una lista de gifs obtenidos de la API de Giphy utilizando el reducer de  `gif`.

## Paso 2: Agregar un enlace al menú

Abre el archivo  `CartMenu.tsx`  y actualiza el siguiente código:

typescript

Copy

```typescript
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../reducers/cartReducer';
import { Cart } from './Cart';
import Link from 'next/link';

export const CartMenu = () => {
  const cartItems = useSelector(selectCartItems);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Link href="/cart" onClick={handleToggle}>
        Cart ({cartItems.length})
      </Link>
      {isOpen && <Cart />}
    </>
  );
};

```

Este código agrega un enlace al menú que lleva a la página de carrito de compras. Al hacer clic en el enlace, se muestra el componente  `Cart`.

## Paso 3: Crear la página de carrito de compras

Crea un archivo llamado  `cart.tsx`  en la carpeta  `pages`  y agrega el siguiente código:

typescript

Copy

```typescript
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../reducers/cartReducer';
import { CartItem } from '../components/CartItem';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="container">
      <h1>Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-total">
        <span>Total:</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;

```

Este componente muestra los items en el carrito de compras y el total de la compra.