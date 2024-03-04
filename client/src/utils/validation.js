export const validateEmail = (email) => {
    // Simple email validation using regular expression
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
  
export const validatePassword = (password) => {
// Validate password length
    return password.length >= 8;
};
  