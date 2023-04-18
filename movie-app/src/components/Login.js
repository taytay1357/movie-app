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
    marginTop: '8vw',
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


function Login(props) {
    const classes = useStyles();
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"https://bytenikita-respectbuzzer-3000.codio-box.uk/sign_in",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div className={classes.root}>
        <Image src='images/movies.jpg' alt="movie image" className={classes.movie_image} />
        <div>
          <div className={classes.logo_holder}><Image src='images/cover.png' alt='logo' className={classes.logo} /></div>
          <Form className={classes.form}>
            <Form.Field className={classes.form_field}>
              <div className={classes.input_icon}><Image className={classes.input_image} src='images/icons8-user-50.png' alt="username icon" /></div>
              <Input name='email' onChange={handleChange} type='email' text={loginForm.email} placeholder="Please enter your email address..." value={loginForm.email} id='text'/>
            </Form.Field>
            <Form.Field className={classes.form_field}>
              <div className={classes.input_icon}><Image className={classes.input_image} src='images/icons8-sign-in-form-password-50.png' alt="username icon" /></div>
              <Input id='text' name='password' onChange={handleChange} type='password' text={loginForm.password} placeholder="Please enter your password..." value={loginForm.password} />
            </Form.Field>
            <Form.Field className={classes.form_field}>
              <Button onClick={async () => {
                          let email = loginForm.email
                          let password = loginForm.password
                          let user = {email, password};
                          const response = await fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/sign_in', {
                              method: 'POST',
                              credentials: 'include',
                              headers: {
                                  'Content-type': 'application/json'
                              },
                              body: JSON.stringify(user)
                          })
                          .then(response => response.json()
                          .then((data) => {
                            console.log(data)
                            data.access_token && props.setToken(data.access_token)
                            window.location.replace('https://bytenikita-respectbuzzer-3000.codio-box.uk')
                          }).catch((error) => {
                            if(error.response){
                            console.log(error.response)
                            console.log(error.response.status)
                            console.log(error.response.headers)
                            }
                          })
                        )
                  }}>Login</Button>
            </Form.Field>
            <div className={classes.page_holder}>
              <Typography className={classes.page_switch}>Need an account?</Typography>
              <Link to="/sign_up" className={classes.link}>Sign Up</Link>
            </div>
          </Form>
        </div>
      </div>
    );
}

export default Login;
