import React from 'react';
import { List, Header, Rating } from "semantic-ui-react";
import Footer from './Footer'
import Nav from './Nav'
import Typography from '@material-ui/core/Typography'
import { Image } from 'semantic-ui-react'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Movie from './Movie'


const useStyles = makeStyles({
    root: {
        marginTop: '4vw'
    },
    card: {
        width: '100%',
        height: '18vw',
        marginBottom: '2vw',
        backgroundColor: 'black',
        border: '4px solid #707070',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    list: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '2vw!important'
    },
    back: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: '-1'
    },
    header: {
        color: 'white!important',
        fontSize: '2.5vw!important',
        width: '100%!important',
        marginBottom: '0!important'
    },
    rating: {
        border: '1px solid white',
        height: '12%',
        padding: '2vw',
        borderRadius: '10px',
        display: 'flex!important',
        alignItems: 'center'
    },
    img: {
        width: '10vw',
        margin: '1vw'
    },
    list_item: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
    content_holder: {
        display: 'flex',
        flexDirection: 'column',
        width: '40vw',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        width: '100%',
        fontSize: '2vw',
        color: 'white!important',
        padding: '1vw',
        marginBottom: '0.5vw'
    },
    under: {
        fontSize: '2vw',
        color: 'brown',
        height: '40vw',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        fontWeight: 'bolder',
        padding: '0 5vw'
    },
    backg: {
      opacity: '0.4'
    },
    header_holder: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      margin: '1vw 0',
      paddingTop: '2vw'
   },
   header_page: {
      color: '#C7C74A!important',
      paddingLeft: '4vw!important',
      fontSize: '2vw!important'
   },

});

export default function Genres(props)
{
    const classes = useStyles()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const genre = urlParams.get('genre')
    const updated_movies = []
    console.log(props.movies)
    for (let i=0; i<props.movies.length; ++i)
    {
       if (props.movies[i].genre.toLowerCase() == genre)
       {
          updated_movies.push(props.movies[i])
          continue
       }
    } 
    console.log(updated_movies)

   return (
      <div>
         <div className={classes.back}><Image className={classes.backg} src='/images/background.jpg' id="background-image" alt="background image" /></div>
         <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
         <div className={classes.root}>
         <div className={classes.header_holder}><Header className={classes.header_page}>Search Results For Genre '{genre.replace(genre[0], genre[0].toUpperCase())}': {updated_movies.length} results.</Header></div>
         <List className={classes.list}>
            {updated_movies.map(movie => {
               const recentImage = localStorage.getItem(movie.route)
               if (recentImage){
                  const myUrl = `https://bytenikita-respectbuzzer-3000.codio-box.uk/movies/search/?title=${movie.title}`
                  return (
                     <a key={movie.title} href={myUrl} onClick={() => 
                        {
                           localStorage.setItem('latest_query', movie.title)
                           console.log(localStorage.getItem('latest_query'))
                        }}>
                     <Card className={classes.card}>
                        <List.Item key={movie.title} className={classes.list_item}>
                           <Image className={classes.img} src={recentImage} alt="Movie Image" />
                           <div className={classes.content_holder}>
                              <Header className={classes.header}>{movie.title}</Header>
                              <Typography className={classes.text}>by {movie.author}</Typography>
                              <Rating className={classes.rating} rating={movie.rating} maxRating={5} disabled size="large"/>
                           </div>
                        </List.Item>
                     </Card> 
                     </a>
                  )
               }
            })}
         </List>
         <Footer user={props.user} />
         </div>
      </div>
	)
}