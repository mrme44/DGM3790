function validateName(username){
    return ! /\s/.test(username)
}

function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email)
}

function validatePassword(password){
    return password.length > 4
}


export {validateName, validateEmail, validatePassword};
