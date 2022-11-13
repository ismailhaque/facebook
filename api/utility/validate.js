
/**
 * @name regular expresion for email
 * @param {*} email 
 * @returns 
 */
export const isEmail = (email) => {

    return email.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

}