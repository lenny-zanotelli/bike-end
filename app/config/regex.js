module.exports = {
    // This regex matches only when all the following are true:
    // password must contain 1 number (0-9)
    // password must contain 1 uppercase letters
    // password must contain 1 lowercase letters
    // password must contain 1 non-alpha numeric character
    // password is 8-16 characters with no space
    password : /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/,
}