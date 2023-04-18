
module.exports =  async  function(object, objectModel) {
    const isExist = await objectModel.findOne({ where: object})
    if(isExist){
        return true
    }
    return false
}


