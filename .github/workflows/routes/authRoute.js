import express from 'express';
import {contactController, forgetPasswordController, loginController, registerController, verifyOtp} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router=express.Router()




//routing
//REGISTER || POST
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [authentication]
 *     description: Sample POST route description
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               emailId:
 *                 type: string
 *               phone:
 *                 type: number
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message
 */

router.post('/register',registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [authentication]
 *     description: Sample POST route description
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message
 */

router.post('/login',loginController);

/**
 * @swagger
 * /api/auth/forgetPassword:
 *   post:
 *     tags: [authentication]
 *     description: Sample POST route description
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message
 */

router.post('/forgetPassword',forgetPasswordController);


/**
 * @swagger
 * /api/auth/verifyOtp:
 *   post:
 *     tags: [authentication]
 *     description: Sample POST route description
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message
 */

router.post('/verifyOtp',verifyOtp);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/auth/send_mail:
 *   post:
 *     tags: [authentication]
 *     description: Send mail with existing credentials
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               message:
 *                 type: string
 *                 example: "Hello, this is a test message."
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/send_mail',requireSignIn,contactController);



export default router;