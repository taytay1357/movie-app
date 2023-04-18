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
      height: '1550px',
      zIndex: '-1',
   },
   card: {
      width: '80%',
      display: 'flex',
      height: '15vw',
      backgroundColor: '#393F3F',
      opacity: '0.9',
      flexWrap: 'nowrap',
      border: '4px solid white',
      alignItems: 'center',
      marginBottom: '3vw'
   },
   img: {
      width: '14vw!important',
      height: '90%',
      padding: '0 1vw'
   },
   list: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
   },
   image_holder: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
   },
   list_item: {
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      height: '100%',
      alignItems: 'center'
   },
   second: {
      height: '80%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      borderRight: '3px solid white'
   },
   rating: {
      height: '100%',
      width: '100%',
      padding: '1vw'
   },
   title: {
      color: 'white!important',
      fontSize: '1.5vw',
      padding: '0.5vw'
   },
   comment: {
      color: 'white!important',
      fontSize: '1.5vw',
      fontStyle: 'italic',
      paddingLeft: '2vw'
   },
   header_holder: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      margin: '1vw 0'
   },
   header: {
      color: '#C7C74A!important',
      paddingLeft: '4vw!important',
      fontSize: '2vw!important'
   },
   backg: {
      opacity: '0.4'
   },
   rating_hold: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
   }


})

export default function Review(props)
{
   const classes = useStyles();
   console.log(props)
   const reviewData = props.reviews

   return (
   <div className={classes.root}>
      <div className={classes.back}><Image className={classes.backg} src='/images/background.jpg' id='background-image' alt="background image"/></div>
      <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
      <div className={classes.header_holder}><Header className={classes.header}>Your Reviews</Header></div>
      <List className={classes.list}>
         {reviewData.map(review => {
            const recentImage = localStorage.getItem(review.route)
            if (recentImage)
            {
               return (
                  <Card className={classes.card}>
                     <List.Item key={review.id} className={classes.list_item}>
                        <div className={classes.image_holder}><Image src={recentImage} className={classes.img} alt="Movie Image" /></div>
                        <div className={classes.second}>
                           <div className={classes.rating_hold}><Rating className={classes.rating} rating={review.rating} maxRating={5} disabled size="large"/></div>
                           <Typography className={classes.title}>{review.title}</Typography>
                        </div>
                        <Typography className={classes.comment}>"{review.comment}"</Typography>
                     </List.Item>
                  </Card>
               )
            }
         })}
      </List>
   </div>
  )
}