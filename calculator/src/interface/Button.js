import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  btn: {
    textAlign: 'center',
    width: '120px',
    height: '80px'
  },
  item_dark: {
    height: '80px',
    padding: '5px'
  }
}))

export default function ({ num, onclick }) {
  const classes = useStyles()
  return (
    <Grid item xs={3} className={classes.item}>
      <button className={classes.btn} onClick={onclick}>{num}</button>
    </Grid>
  )
}