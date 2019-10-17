import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
   const [movie, setMovie] = useState(null);

   const fetchMovie = id => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then(res => setMovie(res.data))
         .catch(err => console.log(err.response));
   };

   useEffect(() => {
      fetchMovie(props.match.params.id);
   }, [props.match.params.id]);

   const handleChange = e =>
      setMovie({ ...movie, [e.target.name]: e.target.value });

   const handleStar = index => e => {
      setMovie({
         ...movie,
         stars: movie.stars.map((star, starIndex) => {
            return starIndex === index ? e.target.value : star;
         })
      });
   };

   const handleSubmit = event => {
      event.preventDefault();
      axios
         .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
         .then(res => {
            console.log(res);
            props.history.push('/');
         })
         .catch(err => console.log(err.response));
   };

   const addStar = event => {
      event.preventDefault();
      setMovie({ ...movie, stars: [...movie.stars, ''] });
   };

   if (!movie) {
      return <div>Loading...</div>;
   }

   return (
      <div className='form-wrapper'>
         <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
               type='text'
               name='title'
               placeholder='title'
               value={movie.title}
               onChange={handleChange}
            />
            <br />
            <label>Director:</label>
            <input
               type='text'
               name='director'
               placeholder='director'
               value={movie.director}
               onChange={handleChange}
            />
            <br />
            <label>Metascore:</label>
            <input
               type='text'
               name='metascore'
               placeholder='metascore'
               value={movie.metascore}
               onChange={handleChange}
            />
            <br />
            <label>Stars:</label>
            {movie.stars.map((starName, index) => {
               return (
                  <input
                     type='text'
                     placeholder='new star...'
                     value={starName}
                     key={index}
                     onChange={handleStar(index)}
                  />
               );
            })}
            <div>
               <button onClick={addStar}>Add Star</button>
               <button type='submit'>Update Movie</button>
            </div>
         </form>
      </div>
   );
};

export default UpdateMovie;
