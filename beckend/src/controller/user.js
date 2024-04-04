const userController = {
    GET: function(req, res) {
        const users = req.getData("users");
        let params = req.params
        if(params && Object.keys(params).length) {
            const idx = users.findIndex(user => user.userId == params.userId);
            if(idx >= 0){
                res.status(200).json({
                    user: users[idx]
                })
            }else{
                res.status(404).json({
                    message: "User not found",
                    statusCode: 404
                })
            }
        }else{
            const search = req.search(users);
            if(Array.isArray(search)){
                res.status(200).json(search)
            }else{
                res.status(200).json(users)
            }
        }
    }
}
module.exports = {userController}