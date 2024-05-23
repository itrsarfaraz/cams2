import dotenv from 'dotenv';
dotenv.config();
import JWT from 'jsonwebtoken';
import { WriteResponse } from '../helpers/response.js';

export const requireSignIn=async(req,res,next)=>{
    try {
        // console.log(process.env.JWT_SECRET);
        // console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decode =JWT.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user=decode;
        next();
    } catch (error) {
        return WriteResponse(res,500,"Internal Server error",null);
    }
}