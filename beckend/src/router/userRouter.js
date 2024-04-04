const userRouter = require("express").Router();
const {search} = require("../middleware/searchData");
const {userController} = require("../controller/user");

userRouter.route("/").get(search, userController.GET)
userRouter.route("/:userId").get(userController.GET)
module.exports = {userRouter}