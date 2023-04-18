import { useState } from 'react';
import axios from "axios";
import { Form, Input, Button } from "semantic-ui-react";
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Image } from 'semantic-ui-react'

const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      maxHeight: '100%',
      backgroundColor: '#201D1D'
    },
    movie_image: {
      height: '968px',
      width: '70%',
      opacity: '50%'
    },
    form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#201D1D'
    },
    logo: {
      width: '80%',
      marginRight: '1vw'
    },
    logo_holder: {
      height: '30%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1vw'
    },
    form_field: {
      width: '75%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', 
      paddingTop: '2vw'
    },
    input_icon: {
      backgroundColor: '#D1BFBF',
      width: '25%',
      height: '61px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRight: '1px solid #707070',
      padding: '2.1vw 0'
      
    },
    page_holder: {
      display: 'flex',
      flexWrap: 'nowrap',
      width: '80%',
      justifyContent: 'flex-end',
      marginTop: '2vw',
      padding: '1vw'
    },
    page_switch: {
      color: 'white',
      fontSize: '1vw',
      marginRight: '0.5vw'
    },
    link: {
      fontSize: '1vw',
      textDecoration: 'underline',
      color: '#33A0A8',
      '&:hover': {
        color: '#77F6FF',
        textDecoration: 'underline'
      },
    }
  });

function Signup(props) {

    const [signUpForm, setSignUpForm] = useState({
      email: "",
      password: "",
      password2: ""
    })

    function createMyAccount(event) {
      axios({
         method: "POST",
         url:"https://bytenikita-respectbuzzer-5000.codio-box.uk/sign_up",
         data:{
            email: signUpForm.email,
            password: signUpForm.password
         }
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
      setSignUpForm(({
         email: "",
         password: ""}))

         event.preventDefault()
   }
      

    function handleChange(event) { 
      const {value, name} = event.target
      setSignUpForm(prevNote => ({
          ...prevNote, [name]: value})
      )}
    
    const classes = useStyles();
    
    return (
      <div className={classes.root}>
        <Image src='images/movies.jpg' alt="movie image" className={classes.movie_image} />
        <div>
          <div className={classes.logo_holder}><Image src='images/cover.png' alt='logo' className={classes.logo} /></div>
          <Form className={classes.form}>
            <Form.Field className={classes.form_field}>
              <div className={classes.input_icon}><Image className={classes.input_image} src='images/icons8-user-50.png' alt="username icon" /></div>
              <Input id="text" name='email' onChange={handleChange} type='email' text={signUpForm.email} placeholder="Please enter your email address..." value={signUpForm.email} />
            </Form.Field>
            <Form.Field className={classes.form_field}>
              <div className={classes.input_icon}><Image className={classes.input_image} src='images/icons8-sign-in-form-password-50.png' alt="username icon" /></div>
              <Input id="text" name='password' onChange={handleChange} type='password' text={signUpForm.password} placeholder="Please enter your password..." value={signUpForm.password} />
            </Form.Field>
            <Form.Field className={classes.form_field}>
              <div className={classes.input_icon}><Image className={classes.input_image} src='images/icons8-sign-in-form-password-50.png' alt="username icon" /></div>
              <Input id="text" name='password2' onChange={handleChange} type='password' text={signUpForm.password} placeholder="Please enter again..." value={signUpForm.password2} />
            </Form.Field>
            <Form.Field className={classes.form_field}>
              <Button onClick={async () => {
                let email = signUpForm.email
                let password = signUpForm.password
                let password2 = signUpForm.password2
                if (password == password2) {
                  const user = {email, password};
                  console.log(user)
                  const response = await fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/sign_up', {
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        'Content-type': 'application/json',
                      },
                      body: JSON.stringify(user)
                      
                  })
                  if (response.ok){
                    window.location.replace("https://bytenikita-respectbuzzer-3000.codio-box.uk/sign_in");
                    console.log('response worked!')
                  }
                }
              }}>Sign Up</Button>
            </Form.Field>
            <div className={classes.page_holder}>
              <Typography className={classes.page_switch}>Already have an account?</Typography>
              <Link to="/sign_in" className={classes.link}>Sign in</Link>
            </div>
          </Form>
        </div>
      </div>
    );
}

export default Signup;