// @flow

type Values = {
  profileUsername: string | void,
  profileEmail: string | void,
  profilePassword: string | void,
  profileLegalName: string | void,
};

type Errors = {
  profileUsername?: string | void,
  profileEmail?: string | void,
  profilePassword?: string | void,
  profileLegalName?: string | void,
};

export function validate_Profile(values: Values): Errors {
  const errors: Errors = {};

  if (values.profileUsername.includes(" ")) {
    errors.profileUsername = "Invalid Username";
  } else if (values.profileUsername.length > 25) {
    errors.profileUsername = "Username must be 25 characters or less";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.profileEmail)) {
    errors.profileEmail = "Invalid email address";
  } else if (values.profileEmail.length > 25) {
    errors.profileEmail = "Email must be 25 characters or less";
  }

  if (values.profilePassword.length < 8 || values.profilePassword.length > 20) {
    errors.profilePassword =
      "Must be greater than 8 and less than 20 characters long";
  } else if (values.profilePassword.includes(" ")) {
    errors.profilePassword = "Invalid Password";
  }

  if (!/^[A-Za-z ]+$/.test(values.profileLegalName)) {
    errors.profileLegalName =
      "Legal Name can only contain alphabetic characters";
  } else if (values.profileLegalName.length < 3) {
    errors.profileLegalName = "Legal Name must be at least 3 characters long";
  } else if (values.profileLegalName.length > 25) {
    errors.profileLegalName = "Legal Name must be 25 characters or less";
  }

  return errors;
}
