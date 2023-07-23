let index = 2000

const zIndex = (idx) => {
  if (idx) {
    index = idx
  } else {
    index += 1
  }

  document.documentElement.style.setProperty('--outline-zIndex', `${index}`)

  return index
}

export default zIndex
