function Validate(login) {
  const errors = {};
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /[0-9]/;

  const { email, password } = login;
  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid Email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password is too short";
  } else if (password.length > 40) {
    errors.password = "Password is too long";
  } else if (!passwordRegex.test(password)) {
    errors.password = "Password must contain at least one number";
  }

  return errors;
}

export default Validate;
