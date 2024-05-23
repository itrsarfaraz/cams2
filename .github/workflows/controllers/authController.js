import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { WriteResponse } from "../helpers/response.js"
import { maildata, transporter } from "../helpers/transporter.js";
import otpModel from "../models/otpModel.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';



export const registerController=async(req,res)=>{
    try {
        // throw new Error({'error':'error'});

        //Validate name
        if (!req.body.name || req.body.name.length > 100 || !/^[a-zA-Z\s]+$/.test(req.body.name)) {
            return WriteResponse(res, 400, "Name can't be empty, must be less than 100 characters, and can only include letters and spaces", null);
        }
        
        //Validate email
        const ValidEmail=isValidEmail(req.body.emailId);
        if(!ValidEmail){
            return WriteResponse(res,400,"Please enter a valid email",null);
        }

        //Validate phone no.
        if(!isValidPhone(req.body.phone)){
            return WriteResponse(res,400,"Please enter a valid phone number",null)
        }
        //Validate password
        if(!isValidPassword){
            return WriteResponse(res,400,"Password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, and one special character.",null)
        }

         //Validate address
         if (!req.body.address || req.body.address.length > 250) {
            return WriteResponse(res, 400, "Address can't be empty, must be less than 250 characters.", null);
        }


        
         const existing_user=await userModel.findOne({email:req.body.emailId});
        //  console.log("existing_user--------------------->",existing_user);
         if(existing_user){
            return WriteResponse(res, 409, "Account already exist with this email.",null);
         }
        const hashedpass= await hashPassword(req.body.password);
        const user = new userModel({
            email: req.body.emailId, // Ensure this matches the field in your Swagger doc
            password: hashedpass,
            name: req.body.name,
            address: req.body.address
        });

         // Save the user to the database
         const savedUser = await user.save();
        // const savedUser = await userModel.create({
        //     email: req.body.emailId,
        //     password: hashedpass,
        //     name: req.body.name,
        //     address: req.body.address
        // });
       
        return WriteResponse(res,200,"successful",savedUser);
    } catch (error) {
        console.log(error);
        return WriteResponse(res,500,"Internal Server error",null);
    }
}

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //validation
        if(!email || !password){
           return WriteResponse(res,402,"error:Invalid email or password",null); 
        }
        //check user
        const user=await userModel.findOne({email});
        if(!user){
            return WriteResponse(res, 404, "Account does not exist with this email.",null);
         }
        const match = await comparePassword(user.password,password);
        if(!match){
            return WriteResponse(res,401,"Invalid Password",null);
        }
        //token
        const token=await JWT.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"1d"});
        const data={
            _id:user.id,
            email:user.email,
            token:token
        }
        return WriteResponse(res,200,"Login Successful",data);
    } catch (error) {
        return WriteResponse(res,500,"Internal Server Error",null);
    }
}

export const forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return WriteResponse(res, 404, "Account with this Email does not exist.", null);
        }
        
        const otp = generateRandomOtp();
        const existing_user=await otpModel.findOne({email})
        console.log("existing_user---------------->",existing_user);
        const currentTime = Date.now();
        if(existing_user && (currentTime - new Date(existing_user.createdAt).getTime() < 10 * 60 * 1000)){
            await otpModel.deleteOne({email});
        }
        await otpModel.create({
            email: email, 
            otp:otp,
        })
    
        const msg = `You are receiving this email because a request to reset your password was received for your account.<br><br>

Your one-time password (OTP) for password reset is: <b>${otp}</b><br><br>

For security reasons, please do not share this OTP with anyone. Enter this OTP on the password reset page to complete the process.<br><br>

If you did not request a password reset, please ignore this email or contact our support team immediately.`;

    
        const mail = maildata(email, "Password Reset OTP", msg, `<b>${msg}</b>`);
        // console.log(mail);
        transporter.sendMail(mail, (err, info) => {
            if (err) {
                console.log(err);
                return WriteResponse(res, 500, "Error sending email.", null);
            }
        });

    
        return WriteResponse(res, 200, "OTP sent to your email id successfully.", null);
    } catch (error) {
        console.log(error);
        return WriteResponse(res, 500, "Internal Server Error", null);
    }
};

export const contactController=async(req,res)=>{
    try {
        const mail=maildata('iprincepurohit@gmail.com',"test","first email text",'<b>kya baat h</b>');
        // console.log(mail);
        transporter.sendMail(mail,(err, info)=>{
            if(err)
              console.log(err)
            // else
            //   console.log(info);
         });
         return WriteResponse(res,201,"Mail sent successfully",null);

    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp=async(req,res)=> {
    const {email,otp}=req.body;

    const result = await otpVerification(email,otp);

    if (result =='EXPIRED') {
        return WriteResponse(res,402,'Sorry, this OTP has expired.',null);
      } else if (result == 'INVALID') {
        return WriteResponse(res,402,"Invalid OTP",null);
      }
  
      return WriteResponse(res,201,"OTP verified successfully.",null);
  }


//check the email is valid or not
function isValidEmail(email){
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone){
    const phoneNumberRegex = /^\d{10,}$/;
    return phoneNumberRegex.test(phone)
}

function isValidPassword(password){
    const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);

}

function generateRandomOtp(){
    const charset = '1234567890';
    let password = '';
    
    for (let i = 0; i <6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }

async function otpVerification(email, otp){
    const storedOtp = await otpModel.findOne({email});

    if (!storedOtp) {
        return 'INVALID';
    }

    if (Date.now() - new Date(storedOtp.createdAt).getTime() > 600000) { //60,000 ,600000
        await otpModel.deleteOne({email});
        return 'EXPIRED';
    }

    if (storedOtp.otp !== otp) {
        return 'INVALID';
    }

    await otpModel.deleteOne({email});
    return 'VALID';
}
