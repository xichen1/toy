import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

import Button from './Button'
import './calculator.css'
import check from '../calculate/check'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    width: '480px',
    minHeight: '500px'
  },
  result: {
    textAlign: 'right',
    backgroundColor: '#eee',
    height: '50px'
  }
}));

export default function Calculator() {
  const [result1, setResult1] = useState('')
  const [result2, setResult2] = useState('0')
  const [useart, setUseart] = useState(false)
  const [usedot, setUsedot] = useState(false)

  const classes = useStyles();
  const btn_num = ['%', '/', 'C', 'back', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '=']

  const handleres1 = (char) => {
    if (char !== 'C') {
      setResult1(result1 + result2 + char)
      setUseart(true)
      setUsedot(false)
    } else if (char === 'C') {
      setResult1('')
      setResult2('0')
    }
  }

  const handleres2 = (char) => {
    let r
    if (useart) {
      r = ''
      setUseart(false)
    } else {
      r = result2
    }

    if (char === '.' && !usedot) {
      console.log(r)
      setUsedot(true)
      setResult2(r + '.')
    } else if (char === 'back' && !useart) {
      result2.length < 2 ? setResult2('0') : setResult2(result2.slice(0, -1))
    } else if (result2 === '0' && char !== '+/-' && char !== '.') {
      setResult2(char)
    } else if (result2 !== '0' && char !== '+/-' && char !== '.') {
      setResult2(r + char.toString())
    }
  }

  const handleclick = (char) => {
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', '+/-', 'back'].indexOf(char) !== -1) {
      handleres2(char)
    } else {
      handleres1(char)
    }

    // if (Number.isInteger(char)) {
    //   if (result2 !== 0) {
    //     setResult2(result2 * 10 + char)
    //   } else {
    //     setResult2(char)
    //   }
    // }
    // if (char === 'C') {
    //   setResult2(0)
    // }
    // const checkedvalue = check(char, result1)
    // setResult1(checkedvalue)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.result}>
          {result1 === '' ? <div></div> : <Typography >{result1}</Typography>}

        </Grid>
        <Grid item xs={12} className={classes.result}>
          <Typography variant='h3'>{result2}</Typography>
        </Grid>
        {btn_num.map(n => <Button key={n} num={n} onclick={() => handleclick(n)} />)}
      </Grid>
    </div>
  )
}