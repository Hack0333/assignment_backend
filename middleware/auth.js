import jwt, { decode } from 'jsonwebtoken'

const isLoggedIn = async(req,res,next) =>{
    try {
        const {token} = req.cookies;
        if(!token) return res.status(400).json({success:false , message : "No token"});

        const decoded =  jwt.verify(token , process.env.JWT_SECRET);
        if(!decoded){
            console.log(decoded);
            return res.status(400).json({success:false , message : "You are not authenticated"});
        }

        const role = decoded.role;
    
        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export default isLoggedIn;