import bcrypt from 'bcrypt'

/**
 * @name create hash Password
 * @param {*} password 
 * @returns 
 */
export const hashPassword = (password) => {

    // salt
    const salt = bcrypt.genSaltSync(12)
    // hash password
    const hashPass = bcrypt.hashSync(password, salt)
    return hashPass

}


/**
 * @name password verify
 * @param {*} password 
 * @param {*} hash 
 * @returns 
 */
export const passwordVerify = (password, hash) => {

    return bcrypt.compareSync(password, hash)

}