const {verify} = require("jsonwebtoken")
const authToken = (req, res, next) => {
    try{
        const users = req.getData("users");
        const {token} = req.headers;
        const {userId} = verify(token, "BECKEND_KEY");
        if(userId && users.some(user => user.userId == userId)){
            return next()
        }else{
            throw new Error("Invalid token")
        }
    }catch(error){
        res.status(401).json({message: error.message})
    }
}

module.exports = {authToken}