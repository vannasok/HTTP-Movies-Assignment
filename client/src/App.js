import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';

const App = () => {
   const [savedList, setSavedList] = useState([]);

   const addToSavedList = movie => {
      setSavedList([...savedList, movie]);
   };

   return (
      <>
         <SavedList list={savedList} />
         <div className='showcase'>
            <Route exact path='/' component={MovieList} />
            <Route path='/update-movie/:id' component={UpdateMovie} />
            <Route path='/add-movie' component={AddMovie} />
            <Route
               path='/movies/:id'
               render={props => {
                  return <Movie {...props} addToSavedList={addToSavedList} />;
               }}
            />
         </div>
      </>
   );
};

export default App;
