import React, {useEffect, useState} from 'react';
import { List, Header, Rating, Form, Input, Button } from "semantic-ui-react";
import Footer from './Footer'
import Nav from './Nav'
import Typography from '@material-ui/core/Typography'
import { Image } from 'semantic-ui-react'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'


function randomColor() 
{
  let first = Math.floor(Math.random()*255)
  let second = Math.floor(Math.random()*255)
  let third = Math.floor(Math.random()*255)

  return `rgba(${first}, ${second}, ${third}, 0.8)!important`
}

const color = randomColor()

const useStyles = makeStyles({
    root: {
        marginTop: '4vw',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
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
      paddingLeft: '10vw!important',
      fontSize: '2vw!important'
   },
   head: {
     backgroundColor: color,
     borderRadius: '150px',
     border: '3px solid white!important',
     height: '250px',
     width: '250px',
     color: 'white!important',
     fontWeight: 'bolder!important',
     fontSize: '8vw!important',
     textAlign: 'center',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center'
   },
   head_hold: {
     width: '100%',
     height: '300px',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center'
     
   },
   email: {
     color: 'white',
     fontSize: '1.2vw',
     fontWeight: 'bolder'
   },
   content_holder: {
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     flexDirection: 'column',
     backgroundColor: color,
     border: '3px solid white',
     width: '60%',
     margin: '4vw 0',
     padding: '1vw'
   },
   field: {
     textAlign: 'end',
     color: 'white',
     fontWeight: 'bolder',
     fontSize: '1vw',
     padding: '1vw',
     width: '8vw',
     margin: '0 1vw',
     borderRight: '2px solid white',
   },
   output: {
     display: 'flex',
     textAlign: 'start',
     alignItems: 'center',
     color: 'white',
     fontSize: '1vw!important',
     fontWeight: 'bolder',
     width: '55vw',
     padding: '0 2vw',
   },
   field_holder: {
     width: '100%',
     display: 'flex',
     flexWrap: 'nowrap',
     flexDirection: 'row',
     margin: '0.5vw',
     justifyContent: 'center',
     
   }, 
   details_hold: {
     width: '100%',
     display: 'flex',
     flexWrap: 'nowrap',
     flexDirection: 'row',
     justifyContent: 'flex-start',
     borderBottom: '1px solid black',
     margin: '1vw 0'
   },
   details: {
     fontSize: '1.5vw',
     color: 'black',
     padding: '1vw',
   }
})

export default function User(props)
{
  const classes = useStyles();
  
  let letter = props.user[0]
  letter = new String(letter)
  letter = letter[0].toUpperCase()
  const length = props.user[2]
  const str = "*".repeat(length)

  
  return (
    <div className={classes.root}>
      <div className={classes.back}><Image src='/images/second_background.jpg' className={classes.backg} alt="background image"/></div>
        <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
        <div className={classes.header_holder}><Header className={classes.header_page}>Profile</Header></div>
        <div className={classes.head_hold}><Header className={classes.head}>{letter}</Header></div>
        <Typography className={classes.email}>{props.user[0]}</Typography>
        <div className={classes.content_holder}>
          <div className={classes.details_hold}><Typography className={classes.details}>Details</Typography></div>
          <div className={classes.field_holder}>
            <Typography className={classes.field}>Email:</Typography>
            <Typography className={classes.output}>{props.user[0]}</Typography>
          </div>
          <div className={classes.field_holder}>
            <Typography className={classes.field}>Password:</Typography>
            <Typography className={classes.output}>{str}</Typography>
          </div>
        </div>
    </div>
  )

}