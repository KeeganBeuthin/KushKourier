// @flow

type Values = {
  registerUsername: string | void,
  registerEmail: string | void,
  registerPassword: string | void,
  registerCpassword: string | void,
  registerFirstName: string | void,
  registerLastName: string | void,
};

type Errors = {
  registerUsername?: string | void,
  registerEmail?: string | void,
  registerPassword?: string | void,
  registerCpassword?: string | void,
  registerFirstName?: string | void,
  registerLastName?: string | void,

};

export function register_validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.registerUsername) {
    errors.registerUsername = "Required";
  } else if (values.registerUsername.includes(" ")) {
    errors.registerUsername = "Invalid Username";
  } else if (values.registerUsername.length > 20) {
    errors.registerUsername = "Username must be 25 characters or less";
  }

  if (!values.registerEmail) {
    errors.registerEmail = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.registerEmail)
  ) {
    errors.registerEmail = "Invalid email address";
  } else if (values.registerEmail.length > 25) {
    errors.registerEmail = "Email must be 25 characters or less";
  }

  if (!values.registerPassword) {
    errors.registerPassword = "Required";
  } else if (
    values.registerPassword.length < 8 ||
    values.registerPassword.length > 20
  ) {
    errors.registerPassword =
      "Must be greater than 8 and less than 20 characters long";
  } else if (values.registerPassword.includes(" ")) {
    errors.registerPassword = "Invalid Password";
  }

  if (!values.registerCpassword) {
    errors.registerCpassword = "Required";
  } else if (values.registerCpassword !== values.registerPassword) {
    errors.registerCpassword = "Password does not match...!";
  } else if (values.registerCpassword.includes(" ")) {
    errors.registerCpassword = "Invalid confirm password";
  } else if (
    values.registerPassword.length < 8 ||
    values.registerPassword.length > 20
  ) {
    errors.registerPassword =
      "Must be greater than 8 and less than 20 characters long";
  }

  if (!values.registerFirstName) {
    errors.registerFirstName = "Required";
  } else if (!/^[A-Za-z ]+$/.test(values.registerFirstName)) {
    errors.registerFirstName =
      "Legal Name can only contain alphabetic characters";
  } else if (values.registerFirstName.length < 3) {
    errors.registerFirstName = "Legal Name must be at least 3 characters long";
  } else if (values.registerFirstName.length > 15) {
    errors.registerFirstName = "Legal Name must be 25 characters or less";
  }

  if (!values.registerLastName) {
    errors.registerLastName = "Required";
  } else if (!/^[A-Za-z ]+$/.test(values.registerLastName)) {
    errors.registerLastName =
      "Legal Name can only contain alphabetic characters";
  } else if (values.registerLastName.length < 2) {
    errors.registerLastName = "Legal Name must be at least 2 characters long";
  } else if (values.registerLastName.length > 15) {
    errors.registerLastName = "Legal Name must be 13 characters or less";
  }

  return errors;
}
