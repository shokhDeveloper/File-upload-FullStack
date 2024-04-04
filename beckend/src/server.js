const express = require("express");
const cors = require("cors")
const path = require("path");
const fs = require("fs")
const fileUpload = require("express-fileupload");
const { authRouter } = require("./router/authRouter")
const { PORT, host } = require("./lib/network");
const { model } = require("./middleware/model");
const { authToken } = require("./middleware/authToken");
const {userRouter} = require("./router/userRouter")
const {filesRouter} = require("./router/filesRouter")
const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(model)

app.use("/auth", authRouter);
app.use("/getFile/", express.static(path.join(__dirname, "files")))
app.get("/download/:downloadFile", (req, res) => {
    const {downloadFile} = req.params
    let filePath = path.join(__dirname, "files", downloadFile );
    const file = fs.existsSync(filePath);
    if(file){
        res.download(filePath)
    }
})
app.use(authToken)

app.use("/users", userRouter)
app.use("/files", filesRouter)

app.listen(PORT, () => {
    console.log(`Server is running ${host}`)
})