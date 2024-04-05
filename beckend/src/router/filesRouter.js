const filesRouter = require("express").Router();
const {Validator} = require("../middleware/validator")
const {filesController} = require("../controller/files")
const {FILE_VALIDATOR} = new Validator()
filesRouter.route("/").get(filesController.GET).post(FILE_VALIDATOR, filesController.POST)
filesRouter.route("/:userId").get(filesController.GET)
module.exports = {filesRouter}