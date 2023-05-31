const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTES_API_SECRET_KEY";

const auth = (req,res,next)=>{
    try {

        //access the token
        let token = req.headers.authorization;
        if(token){
            //token processing
            //first split the token
            //token has certain extra information which we append at the starting
            //generally the beared keyword i.e., "bearer token_value"
            token = token.split(" ")[1];//access token_value
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;

        }else{
            return res.status(401).json({message: "Unauthorized User"});
        }

        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({message: "Unauthorized User"});
    }
}

module.exports = auth;