
const isOperator = (char) => {
  return ['+', '-', '*', '/'].indexOf(char)
}

const check = (char, tempres) => {
  if (isOperator(char) !== -1) {
    if (tempres === '') {
      return '0' + char
    } else if (isOperator(tempres.charAt(tempres.length - 1)) !== -1) {
      return tempres.slice(0, -1) + char
    }
    return tempres + char
  } else if (char === 'back') {
    return tempres.slice(0, -1)
  } else if (char === 'C') {
    return ''
  }
  return tempres + char
}

export default check