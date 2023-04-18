import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies  from "./components/Movies";
import { MovieForm }  from "./components/MovieForm";
import { Manage }  from "./components/Manage";
import { Container } from "semantic-ui-react";
import useToken from './components/useToken'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Movie from './components/Movie'
import Review from './components/Review'
import Hot from './components/Hot'
import Genre from './components/Genre'
import Year from './components/Year'
import Popular from './components/Popular'
import Genres from './components/Genres'
import Years from './components/Years'
import User from './components/User'
import Search from './components/Search'

function App() {
  const [movies, setMovies] = useState([]);
  const { token, removeToken, setToken } = useToken()
  const [user, setUser] = useState('');
  const [reviews, setReviews] = useState([]);
  useEffect(()=> {
		fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/movies', { credentials: 'include', headers: { Authorization: 'Bearer ' + token, 'Content-type': 'application/json', 'Access-Control-Allow-Credentials': '*' }})
    .then(response =>response.json()
    .then((data) => {
      console.log(data)
      setMovies(data.movies);
      }).catch((error) => {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      })
    ) ;
  },[]);

   useEffect(()=> {
		fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/protected', { credentials: 'include', headers: { Authorization: 'Bearer ' + token, 'Content-type': 'application/json', 'Access-Control-Allow-Credentials': '*' }})
    .then(response =>response.json()
    .then((data) => {
      console.log(data)
      setUser(data);
      }).catch((error) => {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      })
    ) ;
  },[]);

  
    useEffect(()=> {
      fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/reviews', { credentials: 'include', headers: { Authorization: 'Bearer ' + token ,'Content-type': 'application/json', 'Access-Control-Allow-Credentials': '*' }})
      .then(response =>response.json()
      .then((data) => {
        setReviews(data);
        console.log(reviews)
        }).catch((error) => {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        })
      ) ;
    },[]);
    return (
      <Router>
        <div className="App">
          <Container>
            <Routes>
              <Route exact path='/' element={ <Movies user={user} movies={movies} token={token} setToken={setToken} removeToken={removeToken}/> } />
              <Route exact path='/add_movie' element={ <MovieForm user={user} setToken={setToken} removeToken={removeToken} token={token}/> } />
              <Route exact path='/sign_in' element={ <Login setToken={setToken}/> } />
              <Route exact path='/logout' element={ <Logout  removeToken={removeToken} /> } />
              <Route exact path='/sign_up' element={ <Signup /> } />
              <Route exact path='/movies/search/' element={ <Movie token={token} user={user} setToken={setToken} removeToken={removeToken} setMovies={setMovies} movies={movies}/>} />
              <Route exact path='/movies/query/' element={ <Search token={token} user={user} setToken={setToken} removeToken={removeToken} setMovies={setMovies} movies={movies}/>} />
              <Route exact path='/reviews' element={ <Review user={user} setToken={setToken} removeToken={removeToken} token={token} reviews={reviews}/>} />
              <Route exact path='/hot_right_now' element={ <Hot user={user} setToken={setToken} removeToken={removeToken} token={token} setMovies={setMovies} movies={movies}/> } />
              <Route exact path='/genres' element={ <Genre user={user} setToken={setToken} removeToken={removeToken} token={token}/> } />
              <Route exact path='/year' element={ <Year user={user} setToken={setToken} removeToken={removeToken} token={token}/> } />
              <Route exact path='/popular' element={ <Popular user={user} setToken={setToken} removeToken={removeToken} token={token} setMovies={setMovies} movies={movies}/> } />
              <Route exact path='movies/genres/' element={ <Genres user={user} setToken={setToken} removeToken={removeToken} token={token} setMovies={setMovies} movies={movies} />} />
              <Route exact path='/years/year/' element={ <Years user={user} setToken={setToken} removeToken={removeToken} token={token} setMovies={setMovies} movies={movies} />} />
              <Route exact path='/user' element={ <User user={user} setToken={setToken} removeToken={removeToken} token={token} /> } />
              <Route exact path='/manage' element={ <Manage user={user} setToken={setToken} removeToken={removeToken} token={token} movies={movies}/> } />
            </Routes>
          </Container>
        </div>
      </Router>
  
  ); 
}


export default App;
