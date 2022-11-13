import express from 'express';
import { accountActivateByCode, accountActivateByToken, forgotPassword, login, loginUser, register, resetPassword } from '../controllers/userController.js';

// init router
const router = express.Router();

// router
router.post('/register', register)
router.post('/login', login)
router.get('/me', loginUser)
router.get('/activate/:token', accountActivateByToken)
router.post('/code', accountActivateByCode)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

// export router
export default router;