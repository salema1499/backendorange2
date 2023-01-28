const router = require("express").Router()
const Project = require("../app/controller/project.controller")
const upload = require("../app/middleware/fileUpload.middleware")
 //const {auth}=require("../app/middleware/auth.moddleware")
//const {authAdmin}=require("../app/middleware/authAdmin.moddleware")



router.post("/addproject",Project.addProject)
router.get("/allProjects",Project.allProjects)
router.delete("/deleteAll",Project.deleteAll)
router.delete("/deleteProject/:id",Project.deleteProject)

module.exports=router
