const jwt = require("jsonwebtoken")
function verifyToken (req, res,next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error:"Unauthorized access"})
    }
    const token = authHeader.split(" ")[1]
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    }
    catch(err){
        console.error("Token verification failed: ",err)
        return res.status(403).json({error:"Forbidden access"})
    }
}

module.exports = verifyToken