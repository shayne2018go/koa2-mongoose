
/**
 * 插入原始数据
 */
exports.insert= (modelName,datas)=>{
    modelName.collection.insert(datas, (err,res)=>{
        if (err) {
            console.error(err)
        } else {
            console.info(res);
        }
    } )
}



exports.IndexController = (ctx,nexxt)=>{
    
    ctx.body= 'hello index'
}