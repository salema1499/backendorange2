const userModel = require("../../db/models/user.model");
const myHelper = require("../../app/helper");
class User {
  static register = async (req, res) => {
    try {
      console.log("hello");
      if (req.body.password.length < 6)
        throw new Error("password must be more than 6");
      const userData = new userModel(req.body);
      await userData.save();
      myHelper.resHandler(res, 200, true, userData, "user added successfully");
      console.log("hello");
    } catch (e) {
      myHelper.resHandler(res, 500, false, e, e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const userData = await userModel.loginUser(
   
        req.body.email,
        req.body.password
        
      );
      console.log("noonononno")
      const token = await userData.generateToken();

      myHelper.resHandler(
        res,
        200,
        true,
        { user: userData, token },
        "user added successfully"
      );
    } catch (e) {
      myHelper.resHandler(res, 500, false, e, e.message);
    }
  };



  static userProfile = async (req, res) => {
    try {
      const userData = await userModel.find({ _id: req.params.id }).populate("roleId unitId");

      myHelper.resHandler(
        res,
        200,
        true,
        userData,
        "user profile successfully"
      );
    } catch (e) {
      myHelper.resHandler(res, 500, false, e, e.message);
    }
  };


  static deleteprofile=async(req,res)=>{

    try {
        const userData = await userModel.deleteOne({ _id: req.params.id })
  
        myHelper.resHandler(
          res,
          200,
          true,
          userData,
          "user is delete your profile successfully"
        );
      } catch (e) {
        myHelper.resHandler(res, 500, false, e, e.message);
      }

  }

  static allusers=async(req,res)=>{
    try {
        const userData = await userModel.find()
  
        myHelper.resHandler(
          res,
          200,
          true,
          userData,
          "all users.. successfully"
        );
      } catch (e) {
        myHelper.resHandler(res, 500, false, e, e.message);
      }
  }


  static editme=async(req,res)=>{
    try{
      
         const user = await userModel.updateOne({_id:req.params.id},req.body)
       
        console.log(req.body)
        myHelper.resHandler(res, 200, true,user,"this user is edited ")
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, e.message)

    }
}
}
module.exports = User;
