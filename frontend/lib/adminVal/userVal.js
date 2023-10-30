type Values = {
    userId: number | void,

  };

const userVal = (values: Values): Errors => {



    type Errors = {
        userId?: number | void,
      };

      const errors = {}
      
if (isNaN(values.userId)) {
    errors.userId = 'Id must be a number';
  } else if(!values.userId){
      errors.userId = 'Id is required'
  } else if (values.userId < 0){
      errors.userId = 'Id must be 0 or more'
  }

  return errors
}

export default userVal