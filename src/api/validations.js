export const validateEmail = (email) => {
  const regex = /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?!.*[#\/\/&|])[A-Za-z0-9]{6,20}$/
  return (regex.test(password))
}
