import argon2 from 'argon2';

export const hashPassword=(password)=>{
    try {
        const hashPassword=argon2.hash(password);
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword=async(hashedPassword,password)=>{
    return argon2.verify(hashedPassword,password);  
}