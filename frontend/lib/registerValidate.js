// @flow

type Values = {
    registerUsername: string | void,
    registerEmail: string | void,
    registerPassword: string | void,
    registerCpassword: string | void,

  };
  
  type Errors = {
    registerUsername?: string | void,
    registerEmail?: string | void,
    registerPassword?: string | void,
    registerCpassword?: string | void,
    
  };
  
  export function register_validate(values: Values): Errors {
      const errors: Errors = {};
  
      if (!values.registerUsername) {
          errors.registerUsername = 'Required';
      } else if (values.registerUsername.includes(' ')) {
          errors.registerUsername = 'Invalid Username';
      }
  
      if (!values.registerEmail) {
          errors.registerEmail = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.registerEmail)) {
          errors.registerEmail = 'Invalid email address';
      }
  
      if (!values.registerPassword) {
          errors.registerPassword = 'Required';
      } else if (values.registerPassword.length < 8 || values.registerPassword.length > 20) {
          errors.registerPassword = 'Must be greater than 8 and less than 20 characters long';
      } else if (values.registerPassword.includes(' ')) {
          errors.registerPassword = 'Invalid Password';
      }
  
      // Validate confirm password
      if (!values.registerCpassword) {
          errors.registerCpassword = 'Required';
      } else if (values.registerCpassword !== values.registerPassword) {
          errors.registerCpassword = 'Password does not match...!';
      } else if (values.registerCpassword.includes(' ')) {
          errors.registerCpassword = 'Invalid confirm password';
      }
  
      return errors;
  }
  