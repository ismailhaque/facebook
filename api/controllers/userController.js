import userModels from "../models/userModels.js";
import createError from "../utility/createError.js";
import { hashPassword, passwordVerify } from "../utility/hash.js";
import { accountActivation } from "../utility/mailTemplate.js";
import { getRandom } from "../utility/math.js";
import { sendMail } from "../utility/sendMail.js";
import { createToken, verifyToken } from "../utility/token.js";
import { isEmail } from "../utility/validate.js";

/**
 * 
 * @name register
 * @access public
 * @route /api/user/register
 * @method post
 * 
 */

export const register = async (req, res, next) => {

    try {

        const { frist_name, sur_name, brith_date, brith_month, brith_year, gender, email, password } = req.body;

        if (!frist_name || !sur_name || !brith_date || !gender || !email || !password) {
            next(createError(400, `All feilds are required!`))
        }

        if (!isEmail(email)) {
            next(createError(400, `Invalid email address!`))
        }

        const emailUser = await userModels.findOne({ email: email })

        if (emailUser) {
            next(createError(400, `Email already exists!`))
        }

        // random code
        let activationCode = getRandom(10000, 99999)

        const checkCode = await userModels.findOne({ code: activationCode })

        if (checkCode) {
            activationCode = getRandom(10000, 99999)
        }

        const user = await userModels.create({
            frist_name,
            sur_name,
            brith_date,
            brith_month,
            brith_year,
            gender,
            email,
            password: hashPassword(password),
            code: activationCode
        })

        // create token
        const activationToken = createToken({ id: user._id }, '30d')

        if (user) {

            sendMail(user.email, 'Account activation', accountActivation({
                name: user.frist_name + ' ' + user.sur_name,
                link: `${process.env.APP_URL + ':' + process.env.PORT}/api/user/activate/${activationToken}`,
                email: user.email,
                code: activationCode,
                app_url: process.env.APP_URL + ':' + process.env.PORT
            }))

            res.status(200).json({
                message: 'Account create successfully!',
                user: user
            })
        }

    } catch (error) {

        next(error)

    }

};


/**
 * 
 * @name login
 * @access public
 * @route /api/user/login
 * @method get
 * 
 */

export const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            next(createError(400, 'All feilds are required!'))
        }

        if (!isEmail(email)) {
            next(createError(400, `Invalid email address!`))
        }

        const loginUser = await userModels.findOne({ email: email })

        if (!loginUser) {
            next(createError(400, `User not found`))
        } else {

            if (!passwordVerify(password, loginUser.password)) {
                next(createError(400, 'Wrong password'))
            } else {

                const token = createToken({ id: loginUser._id }, '365d')

                res.status(200).cookie('authToken', token).json({
                    message: 'User login successfully!',
                    user: loginUser,
                    token: token
                })

            }

        }

    } catch (error) {
        next(error)
    }
};



/**
 * @name account activate by token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const accountActivateByToken = async (req, res, next) => {

    try {

        const { token } = req.params;

        const tokenData = verifyToken(token)

        if (!tokenData) {
            next(createError(400, 'Invalid activation URL!'))
        }

        if (tokenData) {

            const userAccount = await userModels.findById(tokenData.id)

            if (userAccount.isActivate == true) {
                next(createError(400, 'Your account already activate!'))
            } else {
                await userModels.findByIdAndUpdate(userAccount._id, {
                    code: '',
                    isActivate: true
                })

                res.status(200).json({
                    message: "Your account activation successfull!"
                })
            }
        }

    } catch (error) {
        next(error)
    }

}



/**
 * @name account activate by code
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const accountActivateByCode = async (req, res, next) => {

    try {

        const { code } = req.body

        if (!code) {
            next(createError(400, 'This feilds are required'))
        }

        const user = await userModels.findOne().and({ code: code }, { isActivate: false })

        if (!user) {
            next(createError(400, 'Invalid Activation code!'))
        }

        if (user) {

            await userModels.findByIdAndUpdate(user._id, {
                code: '',
                isActivate: true
            })

            res.status(200).json({
                message: 'Account activation successful!'
            })
        }

    } catch (error) {
        next(error)
    }

}



/**
 * @name get login user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const loginUser = async (req, res, next) => {

    try {

        const auth_token = req.headers.authorization

        if (!auth_token) {
            next(createError(400, 'Token not found'))
        }

        if (auth_token) {
            // token
            const token = auth_token.split(' ')[1]

            // verify token
            const user = verifyToken(token)

            if (!user) {
                next(createError(400, 'Invalid token'))
            }

            if (user) {
                const loginUser = await userModels.findById(user.id)

                res.status(200).json({
                    message: 'Get log in user successful!',
                    user: loginUser
                })
            }
        }



    } catch (error) {
        next(error)
    }

}



/**
 * @name forgot password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const forgotPassword = (req, res, next) => {

    try {

        

    } catch (error) {
        next(error)
    }

}




/**
 * @name reset password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const resetPassword = (req, res, next) => {

    try {

    } catch (error) {
        next(error)
    }

}