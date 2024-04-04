const authRouter = require("express").Router();
const {authController} = require("../controller/auth")
const {Validator} = require("../middleware/validator")
const VALIDATOR_AUTH = new Validator()
authRouter.route("/register").post(VALIDATOR_AUTH.REGISTER_VALIDATOR, authController.REGISTER);

authRouter.route("/login").post(VALIDATOR_AUTH.LOGIN_VALIDATOR, authController.LOGIN);

module.exports = {authRouter};