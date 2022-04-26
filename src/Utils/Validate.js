function Validate(register) {
  const errors = {};
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /[0-9]/;
  const { username, email, birth_date, password, confirm_password } = register;
  if (!username) {
    errors.username = "Username is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid Email";
  }
  const dateUS = new Date(birth_date);
  const dateNow = new Date();

  if (!birth_date) {
    errors.birth_date = "Birth Date is required";
  } else if (dateUS > dateNow) {
    errors.birth_date = "Your date of birth is greater than the current date";
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

  if (!confirm_password) {
    errors.confirm_password = "Confirm password is required";
  } else if (password !== confirm_password) {
    errors.confirm_password = "Password is different from confirm password";
  }

  return errors;
}

export default Validate;
