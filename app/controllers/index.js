

/**
 * 插入原始数据
 */
exports.insert= (modelName,datas)=>{
    modelName.collection.insert(datas, (err,res)=>{
        if (err) {
            // console.error(err)
        } else {
            // console.info(res);
        }
    } )
}

exports.addId =(modelName)=>{
    return new Promise((resolve,reject)=>{
        modelName
            .find({}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    let id = doc.length + 1;
                    resolve(id);
                }
            })
    })
}



exports.IndexController = (ctx,nexxt)=>{
    
    ctx.body= 'hello index'
}