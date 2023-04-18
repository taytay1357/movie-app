import React, {useEffect, useState} from 'react';
import { List, Header, Rating, Form, Input, Button } from "semantic-ui-react";
import Footer from './Footer'
import Nav from './Nav'
import Typography from '@material-ui/core/Typography'
import { Image } from 'semantic-ui-react'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
   root: {
    marginTop: '6vw',
    zIndex: '-2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
   },
   back: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      paddingTop: '2vw!important'
   },
   backg: {
     opacity: '0.3'
   },
   cover: {
     width: '300px',
     height: '390px',
     borderRadius: '14px'
   },
   cover_holder: {
     width: '100%',
     display: 'flex',
     justifyContent: 'center'
   },
   head: {
     fontSize: '2vw!important',
     color: 'white!important',
     margin: '0 0!important',
     marginTop: '0.4vw!important'
   },
   sub_head: {
     fontSize: '1.5vw!important',
     color: 'white!important',
     margin: '0.5vw 0!important'
   },
   syn: {
     fontSize: '1vw!important',
     color: 'white!important',
     padding: '0 18vw'
   },
   rating: {
     width: '20px'
   },
   rating_holder: {
     width: '90%',
     display: 'flex',
     justifyContent: 'center',
     padding: '1vw'
   },
   text: {
     width: '100%!important',
     fontSize: '1vw!important'
   },
   submit_holder: {
      display: 'flex',
      flexWrap: 'nowrap',
      width: '100%',
      justifyContent: 'center'
   },
   field: {
      width: '40%'
   },
   field2: {
      width: '5%'
   },
   btn: {
      padding: '0.7vw!important',
      width: '100%!important',
      backgroundColor: '#D1BFBF!important',
      fontSize: '1vw!important',
      color: '#403A3A!important',
      '&:hover': {
         backgroundColor: '#69B0B5!important',
         color: 'white!important'
      },
      border: '2px solid white!important',
      margin: '0 0.5vw!important'
   }
   
})


export default function Movie(props) 
{
  const movie = localStorage.getItem('latest_query')
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  let movieData = props.movies
  let verdict;

  useEffect(() => {
    for (let i=0; i<props.movies.length; ++i)
    {
      console.log(props.movies[i].title, movie)
      
      if (props.movies[i].title == movie)
      {
        props.setMovies(props.movies[i])
        verdict = false
        break
      }
      if(i > props.movies.length)
      {
        verdict = true
        break
      }
    }
  })
  

  console.log(props.movies)

  
  if (verdict == true) {
    window.location.replace('https://bytenikita-respectbuzzer-3000.codio-box.uk/')
  }
  
  const classes = useStyles();
  const recentImage = localStorage.getItem(movieData.route)
  if (recentImage){
    if (props.user != undefined && props.token != null){
      return (
      <div className={classes.root}>
        <div className={classes.back}><Image className={classes.backg} src='/images/second_background.jpg' id="background-image" alt="background image" /></div>
        <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
        <div className={classes.cover_holder}><Image src={recentImage} className={classes.cover}  alt="movie cover" /></div>
        <Header className={classes.head}>{movieData.title}</Header>
        <Typography className={classes.sub_head}>by {movieData.author}</Typography>
        <Typography className={classes.syn}>{movieData.synopsis}</Typography>
        <div className={classes.rating_holder}><Rating className={classes.rating} rating={movieData.rating} maxRating={5} disabled size="large"/></div>
        <Typography className={classes.syn}>Watched it? What did you think?</Typography>
        <Form>
          <Form.Field>
            <div className={classes.rating_holder}>
            <Rating className={classes.rating}icon="star" 
                    value={rating}
                    maxRating={5} 
                    onRate={(_,data) => setRating(data.rating)}/>
            </div>
          </Form.Field>
          <div className={classes.submit_holder}>
            <Form.Field className={classes.field}>
              <Input placeholder="Tell us what you thought..." className={classes.text} type="text" value={comment} onChange={e => setComment(e.target.value)}/>
            </Form.Field>
            <Form.Field className={classes.field2}>
              <Button className={classes.btn} onClick={async () => {
                        const overall = {'rating':rating , 'comment': comment, 'movie_id': props.movies.id, 'user_email': props.user[0]};
                        const url = `https://bytenikita-respectbuzzer-5000.codio-box.uk/movies/search/?title=${movie}`
                        const response = await fetch(url, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(overall)
                        })
                        if (response.ok){
                            window.location.replace('https://bytenikita-respectbuzzer-3000.codio-box.uk/reviews')
                            console.log('response worked!')
                        }
                    }}>Submit</Button>
            </Form.Field>
          </div>
        </Form>
      </div>
    )  
    } else {
    return (
      <div className={classes.root}>
          <div className={classes.back}><Image className={classes.backg} src='/images/second_background.jpg' id="background-image" alt="background image" /></div>
          <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
          <div className={classes.cover_holder}><Image src={recentImage} className={classes.cover}  alt="movie cover" /></div>
          <Header className={classes.head}>{movieData.title}</Header>
          <Typography className={classes.sub_head}>by {movieData.author}</Typography>
          <Typography className={classes.syn}>{movieData.synopsis}</Typography>
          <div className={classes.rating_holder}><Rating className={classes.rating} rating={movieData.rating} maxRating={5} disabled size="large"/></div>
          <Typography className={classes.syn}>Watched it? Login and tell us what you thought.</Typography>
      </div>
    ) 
    }
  }
  
}