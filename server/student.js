// 引入mongoose数据库
const mongoose=require('mongoose')
// 创建连接数据库中test库
mongoose.connect('mongodb://localhost/test')
// 创建表的规则，并导出
module.exports=mongoose.model('Student',{
    stunum:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    admissiondate:{
        type:String,
        required:true,
    },
    teacher:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    class:{
        type:String,
        required:true,
    },
    job:{
        type:String,
 
    },
    money:{
        type:String,

    }
})