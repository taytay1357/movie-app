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
        marginTop: '4vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
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
   form: {
      width: '60%!important',
      marginTop: '4vw!important',
      height: '20vw!important',
      backgroundColor: 'rgba(112,112,112, 0.2)!important',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: '5px'
   },
   form_field: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   input: {
      fontSize: '1.2vw!important',
      color: 'black!important',
      width: '60%!important'
   },
   btn: {
      padding: '1vw!important',
      fontSize: '1vw!important',
      borderRadius: '10px!important',
      border: '2px solid white!important',
      '&:hover': {
         backgroundColor: '#69B0B5!important',
         color: 'white!important'
      },
   },
   btn_holder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

})


export default function Year(props)
{
   const [year, setYear] = useState();
   const classes = useStyles();
   return(
      <div className={classes.root}>
         <div className={classes.back}><Image src='/images/second_background.jpg' className={classes.backg} alt="background image"/></div>
         <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
         <div className={classes.header_holder}><Header className={classes.header_page}>Browse for films by year...</Header></div>
         <Form className={classes.form}>
            <Form.Field className={classes.form_field}>
               <Input className={classes.input} placeholder="e.g. 1971" type="number" name="year" value={year} onChange={e => setYear(e.target.value)} />
            </Form.Field>
            <Form.Field className={classes.form_field}>
               <div className={classes.btn_holder}><Button className={classes.btn} onClick={() => {
                        const search = {year};
                        window.location.replace(`https://bytenikita-respectbuzzer-3000.codio-box.uk/years/year/?year=${year}`)
                        
               
                    }}>Search</Button></div>
            </Form.Field>
         </Form>
      </div>   
   )
}
