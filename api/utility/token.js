import jwt from "jsonwebtoken";

/**
 * @name create token
 * @param {*} payload 
 * @param {*} exp 
 * @returns 
 */
export const createToken = (payload, exp) =>{
    
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : exp
    });

}


/**
 * @name verify token
 * @param {*} token 
 * @returns 
 */
export const verifyToken = (token) =>{

    return jwt.verify(token, process.env.JWT_SECRET);

}