const path = require("path");
const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regexData = /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/;
const regexLetter = /[A-Za-z]/;
const regexNumber = /[0-9]/;
const MAIN_VALIDATOR = function(email, password){
    try{
        if(!email.length || !regexEmail.test(email)) return {message:"Email its invalid !"};
        if(password.length < 4 || password.length > 14 || !regexLetter.test(password) || !regexNumber.test(password)) return {message: "Password its invalid !"};
        return true
    }catch(error){
        return error
    }
}
class Validator {
    constructor(){ 
        this.REGISTER_VALIDATOR = function(req, res, next){
            console.log(MAIN_VALIDATOR(req.body.email, req.body.password))
            try{
                const {name, lastname, email, password, birthDate} = req.body;
                if(!name) throw new Error("Name its required !")
                if(!lastname) throw new Error("Last name its required !");
                if(!email) throw new Error("Email its required !");
                if(!password) throw new Error("Password its required !" );
                if(!birthDate) throw new Error("Birth date its required !");
                if(!name.length || name.length < 3 || name.length > 20) throw new Error("Name its invalid !");
                if(!lastname.length || lastname.length < 3 || lastname.length > 20) throw new Error("Last name its invalid !");
                if(!birthDate.length || !regexData.test(birthDate)) throw new Error("Birth date its invalid !");
                const resultMainValidator = MAIN_VALIDATOR(email, password);
                if(!resultMainValidator ||  resultMainValidator?.message || Object.keys(resultMainValidator).length) throw new Error(resultMainValidator.message)
                return next()
            }catch(error){
                return res.json({message: error.message})
            }
        }
        this.LOGIN_VALIDATOR = function(req, res, next){
            try{
                const {email, password} = req.body;
                const resultMainValidator = MAIN_VALIDATOR(email, password);
                if(!resultMainValidator ||  resultMainValidator?.message || Object.keys(resultMainValidator).length) throw new Error(resultMainValidator.message)
                return next()
            }catch(error){
                return res.json({message: error.message})
            }
        }
        this.FILE_VALIDATOR = function(req, res, next) {
            try{
                const {fileName,  userId} = req.body
                const file = req.files.file[0].name
                if(!fileName) throw new Error("File name its required !");
                if(!file) throw new Error("File its required !");
                if(!userId) throw new Error("User id its required !");
                if(!fileName.length || !isNaN(+fileName)) throw new Error("File name its invalid !");
                const extName = path.extname(file);
                if(!extName || !isNaN(+file)) throw new Error("File its invalid !");
                if(isNaN(+userId)) throw new Error("User id its invalid !");
                return next();
            }catch(error){
                return res.json({message: error.message})
            }
        }
    }
}

module.exports = {Validator}