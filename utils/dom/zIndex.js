import setProperty from './setProperty'

let index = 2000

const zIndex = (idx) => {
  if (idx) {
    index = idx
  } else {
    index += 1
  }

  setProperty('--outline-zIndex', `${index}`)

  return index
}

export default zIndex
