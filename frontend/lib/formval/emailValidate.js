// @flow

type Values = {
  profileEmail: string | void,
};

type Errors = {
  profileEmail?: string | void,
};

export function validateEmail(values: Values): Errors {
  const errors: Errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.profileEmail)) {
    errors.profileEmail = "Invalid email address";
  } else if (values.profileEmail.length > 25) {
    errors.profileEmail = "Email must be 25 characters or less";
  }

  return errors;
}
