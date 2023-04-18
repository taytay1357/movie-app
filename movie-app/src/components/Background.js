import React from 'react';
import { Image } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
   root: {
      zIndex: -1,
      width: '100%',
      height: '100%',
      position: 'fixed'
   }

})

export default function Background(props) {
   const classes = useStyles();
	return (
      <div>
         <Image src="images/background.jpg" alt="Background image" className={classes.root} />  
      </div>
	)
}
