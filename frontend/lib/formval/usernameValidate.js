//@flow
type Values = {
    profileUsername: string | void,
  };
  
  type Errors = {
    profileUsername?: string | void,
  };
  
  export function username_validate(values: Values): Errors {
    const errors: Errors = {};
  
  if(values.profileUsername.includes(' ')) {
      errors.profileUsername = 'Invalid Username';
    } else if (values.profileUsername.length > 25) {
      errors.profileUsername = 'Username must be 25 characters or less';
    }
  
    return errors;
  }