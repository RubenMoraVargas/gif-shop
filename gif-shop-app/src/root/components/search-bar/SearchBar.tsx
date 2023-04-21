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