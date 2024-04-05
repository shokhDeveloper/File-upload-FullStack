const {verify} = require("jsonwebtoken")
const authToken = (req, res, next) => {
    try{
        const users = req.getData("users");
        const {token} = req.headers;
        const parsedToken = verify(token, "BECKEND_KEY");
        if(parsedToken.userId && users.some(user => user.userId == parsedToken.userId) && parsedToken.userAgent == req["headers"]["user-agent"]){
            return next()
        }else{
            throw new Error("Invalid token")
        }
    }catch(error){
        res.status(401).json({message: error.message})
    }
}

module.exports = {authToken}