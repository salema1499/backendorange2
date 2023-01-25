const projectSehema = require("../../db/models/project.model")
const myHelper = require("../../app/helper")


class Project{
    static addProject = async(req,res) => {
        try{
            console.log("njnjnjnjnjn")
            const addProject = new projectSehema(req.body)
            console.log("njnjnjnjnjn")
            // const area = await areData.generateArea();
            console.log("njnjnjnjnjn")
            await addProject.save()
            myHelper.resHandler(res, 200, true, {addProject}, " Project  added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    // static loginRole = async(req,res) => {
    //     try{

    //         const addrole = await userRole.loginrole( req.body.userType)
    //         const token = await addrole.generateToken()
         
    //         myHelper.resHandler(res, 200, true, {user:addrole,token}, "user added successfully")
    //     }
    //     catch(e){
    //         myHelper.resHandler(res, 500, false, e, e.message)
    //     }
    // }
    static allProjects = async(req,res) => {
        try{
            const allProjects = await projectSehema.find()
          
            myHelper.resHandler(res, 200, true, allProjects, " All Projects....")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static deleteAll = async(req,res) => {
        try{
            const deleteAll = await projectSehema.deleteMany()
                               
            myHelper.resHandler(res, 200, true, deleteAll, " All Projects is deleted....")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static deleteProject=async(req,res)=>{// to delete this user

        try{
            const deleteProject = await projectSehema.deleteOne({user:req.params.id})
            myHelper.resHandler(res, 200, true,deleteProject,"this project is deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    
    
}
module.exports = Project