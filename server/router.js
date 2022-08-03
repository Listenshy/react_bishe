let express = require('express')
//引入curd.js数据库,User就是数据库
let User = require('./crud.js')

let Teacher = require('./teacher.js')



// 密码加密
let md5 = require('blueimp-md5')

let router = express.Router()

let Student = require('./student.js')

//req客户端，res服务端
// 注册时查找数据库是否有相同的用户名
router.post('/user/register', (req, res) => {
    let body = req.body

    // 找到数据库中是否存在username,nickname,如果找到用户名或者昵称存在
    User.find({
        $or: [
            { username: body.username },
            { nickname: body.nickname }
        ]
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "查询失败，请联系后台"
            })
        }
        if (data.length !== 0) {
            return res.status(200).json({
                code: 2000,
                flag: false,
                message: "用户名或昵称已存在"
            })
        }
        //    密码加密
        body.token = md5(md5(body.username) + 'buka')
        // console.log(body)
        // 将body的数据存储到数据库中，注意第一个参数是成功的参数
        new User(body).save().then((data, err) => {
            if (data) {
                return res.status(200).json({
                    code: 2000,
                    flag: true,
                    message: "数据存储成功"
                })
            }
            if (err) {
                return res.status(500).json({
                    code: 3000,
                    flag: false,
                    message: "存储失败，请联系后台"
                })
            }
        })

    })
})

// 登录时查找数据库中账号密码是否匹配
router.post("/user/login", (req, res) => {
    let body = req.body;
    // console.log(body);
    User.findOne({ username: body.username, password: body.password }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "登录失败，请联系后台"
            })
        }
        if (!data) {
            return res.status(200).json({
                code: 2000,
                flag: false,
                message: "用户名或密码不存在"
            })
        }

        return res.json({
            code: 2000,
            flag: true,
            message: "登录成功",
            data: {
                token: data.token
            }
        })
    })
})

// 登录时提交获取token，跳转页面
router.get('/user/info', (req, res) => {
    let body = req.query
    // console.log(body)

    User.findOne({ token: body.token }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "token失败，请联系后台"
            })
        }
        if (!data) {
            return res.status(200).json({
                code: 2000,
                flag: false,
                message: "token不存在"
            })
        }

        return res.json({
            code: 2000,
            flag: true,
            message: "成功拿到所有数据",
            // 返给前台
            data: {
                "nickname": data.nickname,
                "id": data._id
            }
        })
    })
})


// 退出用户时查找数据中的token，找到之后为true
router.post("/user/logout", (req, res) => {
    let body = req.body;
    // console.log(body)
    // 查询数据库中的token
    User.findOne({ token: body.token }, (err, data) => {

        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }
        if (!data) {
            return res.status(200).json({
                code: 4000,
                flag: false,
                message: "token不存在"
            })
        }

        return res.status(200).json({
            code: 2000,
            flag: true,
            message: "退出成功"
        })

    })
})



// 查教师
router.get("/teacher/list", (req, res) => {
    Teacher.find({}, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        let content = data.length;
        return res.status(200).json({
            code: 2000,
            flag: true,
            message: "查询成功",
            // 返给前台
            data: {
                content,
                rows: data
            }
        })
    })
})

// 分页，查询
router.post("/teacher/list", (req, res) => {
    let page = req.body.page || 1    //页数
    let size = req.body.size || 10   //一页显示多少条
    let searchMap = req.body.searchMap || {} //条件查询的
    // 创建空对象
    let obj = {}
    // 判断传过来的属性
    searchMap.jobnumber ? obj["jobnumber"] = searchMap.jobnumber : obj
    searchMap.name ? obj["name"] = searchMap.name : obj
    searchMap.role ? obj["role"] = searchMap.role : obj
    searchMap.entrydate ? obj["entrydate"] = searchMap.entrydate : obj
    // console.log(req.body);

    // 上数据库查上方前台传过来的信息
    Teacher.find(obj, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        let content = data.length;

        // 进行条件查询
        //  skip 跳过多少条  limit 查询多少个 
        Teacher.find(obj).skip((page - 1) * parseInt(size)).
            limit(parseInt(size)).exec((err, data) => {
                if (err) {
                    return res.status(500).json({
                        code: 3000,
                        flag: false,
                        message: "服务器后台错误"
                    })
                }
                return res.status(200).json({
                    code: 2000,
                    flag: true,
                    message: "查询成功",
                    // 返给前台，前台通过res.data拿值
                    "data": {
                        content,
                        rows: data
                    }
                })

            })
    })

    // console.log(page, size, searchMap)
})

// 教师存储
router.post("/teacher", (req, res) => {
    // 存储到数据库中,新创建一个对象防止ID乱
    let obj = {
        jobnumber: req.body.jobnumber,
        name: req.body.name,
        role: req.body.role,
        entrydate: req.body.entrydate,
        phone: req.body.phone,

    }
    new Teacher(obj).save(function (err) {
        // console.log(req.body);
        if (err) {
            return res.status(500).json({
                code: 3000,
                "flag": false,
                message: "服务器后台错误"
            })
        }
        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "新增成功",

        })
    })
})

// get请求数据库中的ID，目的能够直接编辑更新教师,拿到这个ID下所有数据 
router.get("/teacher", (req, res) => {
    Teacher.findById(req.query.id, (err, data) => {
        // console.log(req.query)
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "根据id查找数据成功",
            "data": data
        })

    })
})


// 教师编辑更新操作
router.put("/teacher", (req, res) => {
    let id = req.body._id
    // console.log(id);
    // 查找数据库并且更新
    Teacher.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "修改教师信息成功",

        })
    })
})


// 教师删除功能
router.delete("/teacher", (req, res) => {
    Teacher.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "删除教师信息成功",

        })

    })
})



router.post("/student/list", (req, res) => {
    let page = req.body.page || 1    //页数
    let size = req.body.size || 10   //一页显示多少条
    let searchMap = req.body.searchMap || {} //条件查询的
    // 创建空对象
    let obj = {}
    // 判断传过来的属性
    searchMap.stunum ? obj["stunum"] = searchMap.stunum : obj
    searchMap.name ? obj["name"] = searchMap.name : obj
    searchMap.teacher ? obj["teacher"] = searchMap.teacher : obj
    // searchMap.entrydate ? obj["entrydate"] = searchMap.entrydate : obj
    // console.log(req.body);

    // 上数据库查上方前台传过来的信息
    Student.find(obj, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                message: "服务器后台错误"
            })
        }

        let content = data.length;

        // 进行条件查询
        //  skip 跳过多少条  limit 查询多少个 
        Student.find(obj).skip((page - 1) * parseInt(size)).
            limit(parseInt(size)).exec((err, data) => {
                if (err) {
                    return res.status(500).json({
                        code: 3000,
                        flag: false,
                        message: "服务器后台错误"
                    })
                }
                return res.status(200).json({
                    code: 2000,
                    flag: true,
                    message: "查询成功",
                    // 返给前台，前台通过res.data拿值
                    "data": {
                        content,
                        rows: data
                    }
                })

            })
    })

    // console.log(page, size, searchMap)
})


router.post("/student", (req, res) => {
    // console.log(req.body);
    let obj = {
        stunum: req.body.stunum,
        name: req.body.name,
        admissiondate: req.body.admissiondate,
        phone: req.body.phone,
        teacher: req.body.teacher,
        class: req.body.class,
        job: req.body.job,
        money: req.body.money

    }
    new Student(obj).save(function (err) {
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "新增成功",
        })
    })
})


router.get("/student", (req, res) => {
    Student.findById(req.query.id, (err, data) => {
        // console.log(req.query)
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "根据id查找数据成功",
            "data": data
        })

    })
})


router.put("/student", (req, res) => {
    let id = req.body._id
    // console.log(res.body);
    // 查找数据库并且更新
    Student.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "修改学员信息成功",

        })
    })
})

// 学生删除功能
router.delete("/student", (req, res) => {
    Student.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        return res.status(200).json({
            "code": 2000,
            "flag": true,
            "message": "删除学员信息成功",

        })

    })
}),


    // 修改密码（原密码查询）

    router.post("/user/pwd", (req, res) => {
        // console.log(req.body);
        let data = req.body
        User.findOne({
            _id: data.id,
            password: data.pwd,

        }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    "code": 3000,
                    "flag": false,
                    "message": "服务器后台错误"
                })
            }

            if (!data) {
                return res.status(200).json({
                    "code": 4000,
                    "flag": false,
                    "message": "原密码不正确"
                })
            }

            return res.status(200).json({
                "code": 2000,
                "flag": true,
                "message": "密码正确"
            })
        })
    })


// router.post("/user/pwd",(res,req)=>{
//     console.log("");
//     let data=req.body
//     User.findOne({

//     })
// })



router.put("/user/pwd", (req, res) => {
    // console.log(req.body);
    let data = req.body
    User.findOne({
        _id: data.id,


    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                "code": 3000,
                "flag": false,
                "message": "服务器后台错误"
            })
        }

        if (!data) {
            return res.status(200).json({
                "code": 4000,
                "flag": false,
                "message": "原密码不正确"
            })
        }

        // 数据库中没有pwd，转化成password
        data.password = req.body.pwd
        // console.log(data);
        User.findByIdAndUpdate(req.body.id, data, (err) => {
            if (err) {
                return res.status(500).json({
                    "code": 3000,
                    "flag": false,
                    "message": "服务器后台错误"
                })
            }

            return res.status(200).json({
                "code": 2000,
                "flag": true,
                "message": "密码修改成功"
            })

        })
    })




})
module.exports = router

//exports