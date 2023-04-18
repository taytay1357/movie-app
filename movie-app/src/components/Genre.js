import React, {useEffect, useState} from 'react';
import { List, Header, Rating, Form, Input, Button } from "semantic-ui-react";
import Footer from './Footer'
import Nav from './Nav'
import Typography from '@material-ui/core/Typography'
import { Image } from 'semantic-ui-react'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { autoPlay } from 'react-swipeable-views-utils'
import MobileStepper from '@material-ui/core/MobileStepper'
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import StepButton from '@material-ui/core/StepButton'

const useStyles = makeStyles({
   root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '900px'
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
   swipe:{
      width: '30%!important',
      height: '25vw!important',
      backgroundColor: 'rgba(112,112,112, 0.1)',
      display: 'flex!important',
      justifyContent: 'center!important',
      alignItems: 'center!important',
      marginTop: '2vw!important',
      borderRadius: '10px',
      border: '2px solid white'
   },
   image_holder: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
   },
   image: {
      width: '10vw',
      
   },
   content_header: {
      color: 'white!important',
      fontSize: '4vw!important',
      fontStyle: 'italic!important',
   },
   stepper_holder: {
      margin: '2vw 0',
      width: '20vw',
      borderRadius: '20px'
   },
   btn: {
      padding: '0.5vw!important',
      display: 'flex!important',
      alignItems: 'center!important',
      justifyContent: 'center!important',
      textAlign: 'center!important',
      color: 'black!important',
      fontWeight: 'bold!important',
      fontSize: '0.8vw!important'
   },
   header_holder: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      margin: '1vw 0',
      paddingTop: '6vw',
      paddingLeft: '4vw'
   },
   header_page: {
      color: '#C7C74A!important',
      paddingLeft: '4vw!important',
      fontSize: '2vw!important'
   },

})
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Genre(props)
{
   const genres = [
      {genre: 'Horror', imgPath: '/images/ghost.png'},
      {genre: 'Action', imgPath: '/images/action.png'},
      {genre: 'Sci-Fi', imgPath: '/images/sci-fi.png'},
      {genre: 'Romance', imgPath: '/images/love-birds.png'}
   ]
   const [activeStep, setActiveStep] = useState(0);
   const maxSteps = genres.length

   const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleStepChange = (step) => {
    setActiveStep(step);
   };
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <div className={classes.back}><Image src='/images/second_background.jpg' className={classes.backg} alt="background image"/></div>
         <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
         <div className={classes.header_holder}><Header className={classes.header_page}>Browse movies by genre...</Header></div>
         <AutoPlaySwipeableViews
         className={classes.swipe}
         axis={classes.direction === 'rtl' ? 'x-reverse' : 'x'}
         index={activeStep}
         onChangeIndex={handleStepChange}
         enableMouseEvents
         >
         {genres.map((step, index) => (
          <a  href={step.genre.replace(step.genre, `movies/genres/?genre=${step.genre}`).toLowerCase()} key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div>
                  <div className={classes.image_holder}>
                  <Image
                     className={classes.image}
                     src={step.imgPath}
                     alt={step.label}
                  />
                  </div>
                  <Header className={classes.content_header}>{step.genre}</Header>
               </div>
            ) : null}
          </a>        
         ))}
         </AutoPlaySwipeableViews>
         <MobileStepper
         steps={maxSteps}
         position="static"
         activeStep={activeStep}
         className={classes.stepper_holder}
         nextButton={
            <Button
               size="small"
               onClick={handleNext}
               disabled={activeStep === maxSteps - 1}
               className={classes.btn}
            >
               Next
               {classes.direction === 'rtl' ? (
               <KeyboardArrowLeft />
               ) : (
               <KeyboardArrowRight />
               )}
            </Button>
         }
         backButton={
            <Button size="small" className={classes.btn} onClick={handleBack} disabled={activeStep === 0}>
               {classes.direction === 'rtl' ? (
               <KeyboardArrowRight />
               ) : (
               <KeyboardArrowLeft />
               )}
               Back
            </Button>
         }
         />
      </div>
   )
}