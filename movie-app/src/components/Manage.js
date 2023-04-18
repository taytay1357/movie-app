import React, {useState} from 'react';
import { Form, Input, Rating, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { List, Header } from "semantic-ui-react";
import Footer from './Footer'
import Nav from './Nav'
import Typography from '@material-ui/core/Typography'
import { Image } from 'semantic-ui-react'
import Card from '@material-ui/core/Card'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
        marginTop: '4vw',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
  },
  back: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: '-1'
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
    flexWrap: 'wrap'
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
        flexWrap: 'nowrap',
        width: '50vw'
    },
    content_holder: {
        display: 'flex',
        flexDirection: 'column',
        width: '36vw',
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
        color: '#C7C74A',
        height: '40vw',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        fontWeight: 'bolder',
        padding: '0 5vw'
    },
    btn: {
      color: '#C7C74A',
      width: '1.5vw!important',
      zIndex: 1000
    },
    icon: {
      height: '100%',
      width: '100%'
    }
})

export const Manage = (props) => {
  const classes = useStyles();
  if(props.user[1] == 'admin')
  {
    return (
      <div className={classes.root}>
        <div className={classes.back}><Image src='/images/second_background.jpg' className={classes.backg} alt="background image"/></div>
                  <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
                  <div className={classes.header_holder}><Header className={classes.header_page}>Here are all films that are on record!</Header></div>
        <List className={classes.list}>
                              {props.movies.map(movie => {
                                  const recentImage = localStorage.getItem(movie.route)
                                  if (recentImage){
                                      const myUrl = `movies/search/?title=${movie.title}`
                                      return (
                                          <div key={movie.title} href={myUrl} >
                                              <Card className={classes.card}>
                                                      <List.Item key={movie.title} className={classes.list_item}>
                                                          <Image className={classes.img} src={recentImage} alt="Movie Image" />
                                                          <div className={classes.content_holder}>
                                                              <Header className={classes.header}>{movie.title}</Header>
                                                              <Typography className={classes.text}>by {movie.author}</Typography>
                                                              <Rating className={classes.rating} rating={movie.rating} maxRating={5} disabled size="large"/>
                                                          </div>
                                                          <IconButton className={classes.btn} edge="start" color="inherit" aria-label="menu" onClick={async () => {
                                                                const title = movie.title;
                                                                
                                                                
                                                                const response = await fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/manage', {
                                                                    method: 'POST',
                                                                    credentials: 'include',
                                                                    headers: {
                                                                        'Content-type': 'application/json'
                                                                    },
                                                                    body: JSON.stringify(title)
                                                                })
                                 
                                                                if (response.ok){
                                                                  console.log(response)
                                                                  localStorage.removeItem(movie.route)
                                                                  window.location.replace('https://bytenikita-respectbuzzer-3000.codio-box.uk/manage')
                                                                }
                                                                                              }}>
                                                            <DeleteIcon className={classes.icon} />
                                                          </IconButton>
                                                      </List.Item>
                                              </Card> 
                                          </div>
                                      )
                                  }
                                  })}
                          </List>
      </div>
      )
  } else {
    return (
      <div className={classes.root}>
                <div className={classes.back}><Image src='/images/second_background.jpg' className={classes.backg} alt="background image"/></div>
                <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
                <div className={classes.header_holder}><Header className={classes.header_page}>Naughty Naughty! You are not allowed in this page!</Header></div>
      </div>
    )
  }
}