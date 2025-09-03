import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //Milliseconds
        httpOnly: true,
        secure: true, //prevent XXS attack cross site scripting attacks
        sameSite: "None", //CSRF attacks
    })

    console.log("Cookies:", req.cookies);
    console.log("JWT:", req.cookies.jwt);

};

export default generateTokenAndSetCookie;