import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = async(res,userId)=>{
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{ expiresIn: '1h' });
        if(!token) return res.status(400).json({success:false,message:"error creating token"});
        res.cookie("token", token,{
            httpOnly : true, //XSS attack
            secure : process.env.NODE_ENV == "development",
            sameSite : "strict", //csrf attack
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.massage
        })
    }
}