const searchData = (req, _, next) => {
    const searchQuerys = req.query;
    req.search = function(users){
        if(searchQuerys && Object.keys(searchQuerys).length){
            try{
                const store = [];
                for(let user of users){
                    let counter = 0;
                    for(let key in searchQuerys){
                        if(user[key] == searchQuerys[key]) counter += 1;
                    }
                    if(Object.keys(searchQuerys).length == counter) store.push(user);
                }
                return store;
            }catch(error){
                console.log(error.message)
            }
        }
    }
    return next();
}
module.exports = {search: searchData};