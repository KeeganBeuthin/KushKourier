

export default function login_validate(values){
    const errors = {}
    
    if(!values.loginUsername){
        errors.loginUsername='Required';
    }else if(values.loginUsername.includes(' ')){
        errors.loginUsername='Invalid Username'
    }

    //validation for password
    if(!values.loginPassword){
        errors.loginPassword='Required';
    } else if(values.loginPassword.length<8||values.loginPassword.length>20){
        errors.loginPassword='Must be greater than 8 and less than 20 characters long';
    } else if(values.loginPassword.includes(' ')){
        errors.loginPassword ='Invalid Password';
    }
    return errors
}

