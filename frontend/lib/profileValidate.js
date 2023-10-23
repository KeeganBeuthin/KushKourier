// @flow

type Values = {
    username: string | void,
    email: string | void,
    newPassword: string | void,
    confirmNewPassword: string | void,
    legalName: string | void,
  };
  
  type Errors = {
    username?: string | void,
    email?: string | void,
    newPassword?: string | void,
    confirmNewPassword?: string | void,
    legalName?: string | void,
  };
  
  export function ValidateProfile(values: Values): Errors {
    const errors: Errors = {};
  
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.includes(' ')) {
      errors.username = 'Invalid Username';
    } else if (values.username.length > 25) {
      errors.username = 'Username must be 25 characters or less';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    } else if (values.email.length > 25) {
      errors.email = 'Email must be 25 characters or less';
    }
  
    if (!values.newPassword) {
      errors.newPassword = 'Required';
    } else if (values.newPassword.length < 8 || values.newPassword.length > 20) {
      errors.newPassword = 'Must be greater than 8 and less than 20 characters long';
    } else if (values.newPassword.includes(' ')) {
      errors.newPassword = 'Invalid Password';
    }
  
    if (!values.legalName) {
      errors.legalName = 'Required';
    } else if (!/^[A-Za-z ]+$/.test(values.legalName)) {
      errors.legalName = 'Legal Name can only contain alphabetic characters';
    } else if (values.legalName.length < 3) {
      errors.legalName = 'Legal Name must be at least 3 characters long';
    } else if (values.legalName.length > 25) {
      errors.legalName = 'Legal Name must be 25 characters or less';
    }
  
    return errors;
  }
  