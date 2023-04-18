import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar';
import { Image } from 'semantic-ui-react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { Form } from "semantic-ui-react";
import { styled, useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider'
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Close from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import Logout from './Logout'



const useStyles = makeStyles({
   root: {
      backgroundColor: "#2F3636",
      height: '10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'

   },
   img: {
      width: '100%',
      height: '100%',
   },
   icon: {
      height: '70%',
      width: '70%'
   },
   text: {
      '&:hover': {
         cursor: 'pointer',
         color: '#DC771E'
      },
      paddingTop: '0.1vw',
      fontSize: '1vw',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'white'
   },
   border: {
      width: '1vw',
      height: '60%',
      borderRight: '2px solid #666666',
      marginLeft: '1vw'
   },
   search: {
      '&::placeholder': {
         textOverflow: 'ellipsis !important',
         color: 'black'
      },
      backgroundColor: '#FFFFFF',
      borderRadius: '5px 0 0 5px',
      padding: '1vw',
      marginLeft: '1vw',
      width: '40em',
      border: '1px solid white',
      height: '60px'
      
   },
   form_search: {
      display: 'flex',
      flexWrap: 'nowrap',
      marginBottom: '0',
      alignItems: 'center',
      height: '100%'
   },
   form_field: {
      paddingTop: '1em'
   },
   rating: {
      width: '50%',
      height: '25%',
      fontSize: '1em',
      margin: '1vw',
      marginRight: '1.5vw'
   },
   rating_admin: {
      width: '50%',
      height: '25%',
      fontSize: '1em',
      margin: '1vw'
   },
   user: {
      width: '5%',
      height: '45%',
      margin: '1vw 2vw'
   },
   drawer: {
      width: '300px'
   },
   list: {
      width: '500px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
   },
   list_item: {
      '&:hover': {
         backgroundColor: '#69B0B5!important',
         color: 'white!important'
      },
      color: 'white',
      textAlign: 'center',
      padding: '2vw',
      marginTop: '2vw',
      border: '1px solid #707070',
      width: '30em',
      borderRadius: '70px'
   },
   sign: {
      textDecoration: 'None',
      color: 'white',
      '&:hover': {
         color: '#DC771E'
      },
      fontWeight: 'bold',
      fontSize: '1vw',
      marginLeft: '1vw',
      width: '8em'
   },
   cover_holder: {
      height: '100%',
      width: '30%'
   },
   drawer_logo: {
      height: '8vw',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      borderTop: '2px solid white',
      borderBottom: '2px solid white',
      margin: '1vw 0'
   },
   drawer_img: {
      width: '80%'
   },
   user_holder: {
      margin: '0 2vw'
   },
   a: {
      display: 'flex'
   }
});

export default function Nav (props) {
   
   const classes = useStyles();
   const [state, setState] = useState({
      'left': false
   })
   const [text, setText] = useState('');

   const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }
      setState({...state, [anchor]: open });
      }

   const list = (anchor) => (
      <div
         className={classes.list}
         role="presentation"
         onClick={toggleDrawer(anchor, false)}
         onKeyDown={toggleDrawer(anchor, false)}
      >
         <div>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, width: '100%', display: 'flex', justifyContent: 'flex-start' }} onClick={toggleDrawer('left', false)}>
               <Close />
            </IconButton>
         </div>
         <div className={classes.drawer_logo}><Image className={classes.drawer_img} src='/images/cover.png' alt="Logo" /></div>
         <List>
         {['Hot Right Now!', 'Genres', 'Year', 'Popular'].map((text, index) => (
            
            <a href={text.replace(text, `https://bytenikita-respectbuzzer-3000.codio-box.uk/${text}`).toLowerCase().replace(' ', '_').replace(' ', '_').replace('!', '')}>
               <ListItem button key={text} className={classes.list_item}>
                  <ListItemText primary={text} className={classes.list_item_text} />
               </ListItem>
            </a>
         ))}
         </List>
      </div>
   );

   if (props.token == "" || props.token === null || props.user == undefined)
   {
      return (
         <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' className={classes.root}>
               <Toolbar>
                  <a href='/' className={classes.cover_holder}><Image src="/images/cover.png" alt="Logo" className={classes.img}/></a>
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer('left', true)}>
                     <MenuIcon className={ classes.icon } />
                  </IconButton>
                  <Typography button variant="h6" color="inherit" component="div" className={classes.text} onClick={toggleDrawer('left', true)}>
                     Movies
                  </Typography>
                  <div className={classes.border}></div>
                  <Form className={classes.form_search}>
                     <Form.Field className={classes.form_field}>
                        <Input type="text" placeholder="Search for a movie..." onChange={ e => setText(e.target.value)} className={classes.search} name="search_query" /> 
                     </Form.Field>
                     <Form.Field>
                        <IconButton color="primary" component="label" id="search_container" onClick={ async () => {
                           const data = text
                           window.location.replace(`https://bytenikita-respectbuzzer-3000.codio-box.uk/movies/query/?text=${data}`)
                        }}>
                           <Search id="search_icon" />
                        </IconButton>
                     </Form.Field>
                  </Form>
                  <div className={classes.border}></div>
                  <Link to="/sign_in" className={classes.sign}>Sign in</Link>
               </Toolbar>
            </AppBar>
            <Drawer id="drawer" anchor={'left'} className={classes.drawer} open={state['left']} onClose={toggleDrawer('left', false)}>{list('left')}</Drawer>
         </Box>
      )
   } else if (props.user[1] == 'user') {
      return (
         <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' className={classes.root}>
               <Toolbar>
                  <a href='/' className={classes.cover_holder}><Image src="/images/cover.png" alt="Logo" className={classes.img}/></a>
                  <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer('left', true)}>
                     <MenuIcon className={ classes.icon } />
                  </IconButton>
                  <Typography button variant="h6" color="inherit" component="div" className={classes.text} onClick={toggleDrawer('left', true)}>
                     Movies
                  </Typography>
                  <div className={classes.border}></div>
                  <Form className={classes.form_search}>
                     <Form.Field className={classes.form_field}>
                        <Input type="text" placeholder="Search for a movie..." onChange={ e => setText(e.target.value)} className={classes.search} name="search_query" /> 
                     </Form.Field>
                     <Form.Field>
                        <IconButton color="primary" component="label" id="search_container" onClick={ async () => {
                           const data = text
                           window.location.replace(`https://bytenikita-respectbuzzer-3000.codio-box.uk/movies/query/?text=${data}`)
                        }}>
                           <Search id="search_icon" />
                        </IconButton>
                     </Form.Field>
                  </Form>
                  <div className={classes.border}></div>
                  <a href='/reviews'><Image src="/images/icons8-rating-48.png" alt="Ratings Icon" className={classes.rating} button/></a>
                  <a href='/reviews'><Typography variant="h6" color="inherit" component="div" className={classes.text}>
                     Ratings
                  </Typography></a>
                  <a className={classes.user_holder} href={'https://bytenikita-respectbuzzer-3000.codio-box.uk/user'}><Image src="/images/icons8-male-user-100.png" alt="user icon" /></a>
                  <Logout removeToken={props.removeToken} />
               </Toolbar>
            </AppBar>
            <Drawer id="drawer" anchor={'left'} className={classes.drawer} open={state['left']} onClose={toggleDrawer('left', false)}>{list('left')}</Drawer>
         </Box>
         )
      } else if (props.user[1] == 'admin') {
         return (
            <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' className={classes.root}>
               <Toolbar>
                  <a href='/' className={classes.cover_holder}><Image src="/images/cover.png" alt="Logo" className={classes.img}/></a>
                  <a className={classes.a} href='/manage'>'<Typography button variant="h6" color="inherit" component="div" className={classes.text}>
                     Manage Movies
                  </Typography></a>
                  <div className={classes.border}></div>
                  <Form className={classes.form_search}>
                     <Form.Field className={classes.form_field}>
                        <Input type="text" placeholder="Search for a movie..." onChange={ e => setText(e.target.value)} className={classes.search} name="search_query" /> 
                     </Form.Field>
                     <Form.Field>
                        <IconButton color="primary" component="label" id="search_container" onClick={ async () => {
                           const data = text
                           window.location.replace(`https://bytenikita-respectbuzzer-3000.codio-box.uk/movies/query/?text=${data}`)
                        }}>
                           <Search id="search_icon" />
                        </IconButton>
                     </Form.Field>
                  </Form>
                  <div className={classes.border}></div>
                  <a href='/add_movie'><Image src="images/icons8-rating-48.png" alt="Ratings Icon" className={classes.rating_admin} button /></a>
                  <a href='/add_movie'>
                     <Typography button variant="h6" color="inherit" component="div" className={classes.text}>
                        Add Movies
                     </Typography>
                  </a>
                  <Logout removeToken={props.removeToken} />
               </Toolbar>
            </AppBar>
         </Box>
         )
      }
   }      