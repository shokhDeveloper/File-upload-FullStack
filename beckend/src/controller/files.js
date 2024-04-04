const path = require("path");
const filesController = {
    GET: function(req, res) {
        const files = req.getData("files");
        res.json(files)
    },
    
    POST: function(req, res) {
        const files = req.getData("files");
        const newFileBody = req.body;
        let fileName = req.files.file[0].name.replaceAll(" ", "")
        req.files.file[0].mv(path.join(process.cwd(), "src", "files", fileName ));        
        const newFile = {
            fileName: newFileBody.fileName,
            file: fileName,
            userId: newFileBody.userId
        }
        files.push(newFile)
        req.writeData("files", files)
        res.json({
            message: "The file successfull created",
            newFile
        })    
    }
}
module.exports = {filesController};