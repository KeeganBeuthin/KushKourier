// @flow

type Values = {
  profileLegalName: string | void,
};

type Errors = {
  profileLegalName?: string | void,
};

export function legalVal(values: Values): Errors {
  const errors: Errors = {};

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
