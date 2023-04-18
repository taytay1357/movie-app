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
   backg: {
      opacity: '0.4'
    },
    form: {
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(112, 112, 112, 0.4)',
        height: '35vw',
        border: '2px solid white',
        borderRadius: '10px'
    },
    form_field: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        alignItems: 'center',
        height: '10%'
    },
    label: {
        width: '10vw!important',
        fontSize: '1vw!important',
        fontWeight: 'bold!important',
        color: 'white!important',
        padding: '1vw!important',
        borderRight: '3px solid white',
        textAlign: 'end!important'
    },
    input: {
        fontSize: '1vw!important',
        padding: '1vw!important',
        width: '30vw!important'
    },
    select: {
        width: '15vw!important',
        marginLeft: '1vw!important',
        borderBottom: '3px solid white!important',
        color: 'white!important',
        fontSize: '1vw!important',
        fontWeight: 'bold!important'
    },
    rating: {
        marginLeft: '1vw',
        height: '1.5vw!important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    file: {
        marginLeft: '1vw!important',
        width: '15vw!important'
    },
    btn_holder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})

export const MovieForm = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [route, setRoute] = useState('');
    const [year, setYear] = useState('');
    const [synopsis, setSynopsis] = useState('');
    
    const classes = useStyles();
    if(props.user[1] == 'admin')
    {
        return (
            <div className={classes.root}>
                <div className={classes.back}><Image src='/images/second_background.jpg' className={classes.backg} alt="background image"/></div>
                <Nav user={props.user} token={props.token} setToken={props.setToken} removeToken={props.removeToken}/>
                <div className={classes.header_holder}><Header className={classes.header_page}>Add records using the form below</Header></div>
                <Form className={classes.form} encType="multipart/form-data">
                    <Form.Field className={classes.form_field}>
                        <InputLabel className={classes.label}>Title</InputLabel>
                        <Input 
                        placeholder="Please enter the movie title..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className={classes.input}/>
                    </Form.Field>
                    <Form.Field className={classes.form_field}>
                        <InputLabel className={classes.label}>Author</InputLabel>
                        <Input 
                        placeholder="Please enter the author..."
                        value={author}
                        className={classes.input}
                        onChange={e => setAuthor(e.target.value)}/>
                    </Form.Field>
                    <Form.Field className={classes.form_field}>
                        <InputLabel className={classes.label}>Year</InputLabel>
                        <Input 
                        type="number"
                        placeholder="Please enter the year..."
                        value={year}
                        className={classes.input}
                        onChange={e => setYear(e.target.value)}/>
                    </Form.Field>
                    <Form.Field className={classes.form_field}>
                        <InputLabel className={classes.label}>Genre</InputLabel>
                        <Select
                        value={genre}
                        label="Genre"
                        className={classes.select}
                        onChange={e => setGenre(e.target.value)}
                        >
                        <MenuItem value={"Horror"}>Horror</MenuItem>
                        <MenuItem value={"Action"}>Action</MenuItem>
                        <MenuItem value={"Sci-Fi"}>Sci-Fi</MenuItem>
                        <MenuItem value={"Romance"}>Romance</MenuItem>
                    </Select>
                    </Form.Field>
                    <Form.Field className={classes.form_field}>
                        <InputLabel className={classes.label}>Star Rating</InputLabel>
                        <Rating 
                        icon="star" 
                        value={rating}
                        maxRating={5} 
                        className={classes.rating}
                        onRate={(_,data) => setRating(data.rating)}/>
                    </Form.Field>
                    <Form.Field className={classes.form_field}>
                        <InputLabel className={classes.label}>Cover Image</InputLabel>
                        <Input className={classes.file} type="file" accept=".png,.jpg,image/*" name="film_cover" value={route} required onChange={e => {
                            console.log(e.target.value)
                            const reader = new FileReader();
                            setRoute(e.target.value)
                            
                            reader.addEventListener("load", () => {
                            localStorage.setItem(e.target.value, reader.result)
                            console.log(route)
                            })
                            reader.readAsDataURL(e.target.files[0])
                        }
                        }/>
                    </Form.Field>
                    <Form.Field className={classes.form_field}>
                        <InputLabel className={classes.label}>Synopsis</InputLabel>
                        <Input 
                        placeholder="Please enter the synopsis..."
                        value={synopsis}
                        className={classes.input}
                        onChange={e => setSynopsis(e.target.value)}/>
                    </Form.Field>
                    <Form.Field className={classes.form_field}>
                        <div className={classes.btn_holder}><Button className={classes.btn} onClick={async () => {
                            const movie = {title, rating, route, year, author, genre, synopsis};
                            console.log(movie)
                            const response = await fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/add_movie', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify(movie)
                            })
                            if (response.ok){
                                window.location.replace('https://bytenikita-respectbuzzer-3000.codio-box.uk/')
                                console.log('response worked!')
                            }
                        }}>Submit</Button></div>

                    </Form.Field>
                </Form>
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
