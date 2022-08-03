// 引入mongoose数据库
const mongoose=require('mongoose')
// 创建连接数据库中test库
mongoose.connect('mongodb://localhost/test')
// 创建表的规则，并导出
module.exports=mongoose.model('Teacher',{
    jobnumber:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    entrydate:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    }
})