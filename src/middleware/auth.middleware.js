const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    try{
        const authheader = req.headers.authorization;
      if(!authheader)  {
        return res.status(401).json({
            message:"notoken"
        });


      }
      const token = authheader.split(" ")[1];
      if(!token){
        return res.status(401).json({
            message:"invalid token"
        });

      }
    

const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.user = decoded;
next();
}
catch(error){
    return res.status(401).json({message:"invalid token"})
}
};