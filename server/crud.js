// 引入mongoose数据库
const mongoose = require('mongoose')
// 创建连接数据库中test库
mongoose.connect('mongodb://localhost/test')
// 创建表的规则，并导出
module.exports = mongoose.model('Stu', {
    username: {
        type: String,
        required: true,

    },
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
})