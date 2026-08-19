const jwt=require("jsonwebtoken");

const Verifytoken=(req, res, next)=>{

     console.log("========== MIDDLEWARE ==========");

    console.log("Headers:", req.headers);

    const authHeader=req.headers.authorization;

     console.log("Authorization:", authHeader);

    if(!authHeader){
         console.log("❌ No authorization header");
       return res.status(401).json({
            success: false,
            message: "Token is required"
        });
    }

    const token = authHeader.split(" ")[1]
    console.log("Token:", token);
     try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
         console.log("✅ Decoded token:", decoded);

        req.user = decoded;

          console.log("✅ req.user:", req.user);

        next();

    } catch (error) {

          console.log("❌ JWT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

}

module.exports = Verifytoken;