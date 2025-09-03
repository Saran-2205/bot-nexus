import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //Milliseconds
        httpOnly:true, //prevent XXS attack cross site scripting attacks
        sameSite:"None", //CSRF attacks
        secure:process.env.NODE_ENV!=="development" 
    })
};

export default generateTokenAndSetCookie;