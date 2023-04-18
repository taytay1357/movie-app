import logo from '../logo.svg'
import axios from "axios";
import Button from '@material-ui/core/Button'

function Logout(props) {

    return(
        <Button onClick={ async () => {
          const response = await fetch('https://bytenikita-respectbuzzer-5000.codio-box.uk/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
               'Content-type': 'application/json'
            },
          }).then((response) => response.json()
            .then((data) => {
               props.removeToken()
               console.log(data)
               window.location.replace('https://bytenikita-respectbuzzer-3000.codio-box.uk')
            })
          ).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
          })
        }}>Log out</Button>
    )
}

export default Logout;