
 const router = require("express").Router()
// //const Project = require("../app/controller/project.controller")
 const upload = require("../app/middleware/fileUpload.middleware")

router.post("/upload",upload.single('img'),(req,res)=>{
    console.log(req.file)
    try{
    res.json({
        success:1,
        img_url:`http://localhosthost:4000/img/${req.file.filename}`
    })
}
catch(err){
    res.json({
                success:0,
                 message:err.message
             })
}
   
 })

 module.exports=router