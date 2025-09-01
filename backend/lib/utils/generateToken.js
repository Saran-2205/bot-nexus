import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"14d"
    });

    res.cookie("jwt",token,{
        maxAge:14*24*60*60*1000, //Milliseconds
        httpOnly:true, //prevent XXS attack cross site scripting attacks
        sameSite:"none", //CSRF attacks
        secure:true 
    })
};

export default generateTokenAndSetCookie;