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
app.get("/download/:downloadFile", (req, res) => {
    const {downloadFile} = req.params
    let filePath = path.join(__dirname, "files", downloadFile );
    const file = fs.existsSync(filePath);
    if(file){
        res.download(filePath)
    }else{
        res.status(404).json({message: "Topilmadi"})
    }
})
app.use(authToken)
app.get("/getFile/:file",(req, res) => {
    const {file} = req.params;
    const resFile = path.join(__dirname, "files", file)
    res.sendFile(resFile)
})

app.use("/users", userRouter)
app.use("/files", filesRouter)

app.listen(PORT, () => {
    console.log(`Server is running ${host}`)
})