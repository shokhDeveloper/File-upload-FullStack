const { sign } = require("jsonwebtoken");
const sha256 = require("sha256");
const replaceMail = (mail) => {
    const replaceEmail = mail.replace("@gmail", "@email");
    const replaceGmail = mail.replace("@email", "@gmail");
    return mail.includes("@gmail") ? replaceEmail : mail.includes("@email") ? replaceGmail: false;
}
const authController = {
    REGISTER: (req, res) => {
        try{
            const users = req.getData("users");
            if(users.some(user => user.email == req.body.email || user.email == replaceMail(req.body.email))){
                res.status(400).json({message: "The user has ben created !", statusCode: 400})
            }else{
                const user = {
                    ...req.body,
                    password: sha256(req.body.password),
                    userId: users.length ? users[users.length-1].userId + 1 : 1
                }
                users.push(user)
                req.writeData("users", users);
                res.status(201).json({message: "The user successfull registred !", accessToken: sign({userId: user.userId, userAgent: req.headers["user-agent"]}, "BECKEND_KEY", { expiresIn: "1d"}),  user})
            }
        }catch(error){
            res.status(400).json({message: error.message})
        }
    },
    LOGIN: (req, res) => {
        const users = req.getData("users");
        try{
            const {email, password} = req.body;
            const user = users.find(user => user.email == email || user.email == replaceMail(email));
            if(user){
                if(user.password == sha256(password)){
                    res.json({message: "User successfull logined !", statusCode: 200, user, accessToken: sign({userId: user.userId, userAgent: req.headers["user-agent"]}, "BECKEND_KEY", {expiresIn: "1d"}), user}).status(200)
                }else{
                    res.status(400).json({message: "Password its invalid", statusCode: 400})
                }
            }else{
                res.status(404).json({
                    message: "User not found",
                    statusCode: 404
                })
            }
        }catch(error){
            return res.json({message: error.message})
        }
    }
}

module.exports = {authController}