//@flow
type Values = {
  profilePassword: string | void,
};

type Errors = {
  profilePassword?: string | void,
};

export function passVal(values: Values): Errors {
  const errors: Errors = {};

  if (values.profilePassword.length < 8 || values.profilePassword.length > 20) {
    errors.profilePassword =
      "Must be greater than 8 and less than 20 characters long";
  } else if (values.profilePassword.includes(" ")) {
    errors.profilePassword = "Invalid Password";
  }

  return errors;
}
