const express = require("express")
const app = express()
const path=require("path")
require("../db/connect")

app.use(express.json())
app.use('/img',express.static('../upload/images'))
 //app.use(express.static(path.join(__dirname, "../images")))
const userRoutes = require("../routes/user.routes")
const roleRoutes=require("../routes/role.routes")
const urlRoute=require("../routes/url.routes")
const projectRoutes=require("../routes/project.routes")
const imgupload=require("../routes/addimg.routes.js")




//const postRoutes = require("../routes/post.routes")
//app.use("/img",express.static('../upload/images'))
//app.use(express.static(path.join(__dirname, "../upload/images")))

app.use("/api/user/",  userRoutes)
app.use("/api/role/",  roleRoutes)
app.use("/api/user/",urlRoute)
app.use("/api/project/",projectRoutes)
app.use("/api/img/",imgupload)
//app.use(errhandelemagge)
//app.use("/api/post/", postRoutes)
// function errhandelemagge(err,req,res,next){
//    if(err instanceof multer.MulterError){
//     res.join({
//         success:0,
//         message:err.message
//     })
//    }
// }
app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})
module.exports=app