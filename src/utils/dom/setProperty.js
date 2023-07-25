const setProperty = (prop, value) => {
  const documentElement = document.documentElement
  documentElement.style.setProperty(prop, value)
}

export default setProperty
