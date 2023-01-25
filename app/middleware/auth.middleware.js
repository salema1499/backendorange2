const userModel = require("../../db/models/user.model");
const urlModel = require("../../db/models/url.smodel");

const myHelper = require("../../app/helper");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.tokenPass);
    const userData = await userModel
      .findOne({
        _id: decodedToken._id,
        "tokens.token": token,
      })
      .populate("roleId");
    req.user = userData;
    req.token = token;
    console.log(req.user.roleId);

    next();
  } catch (e) {
    myHelper.resHandler(res, 500, false, e.message, "unauthorized");
  }
};
const authUrl = async (req, res, next) => {
  try {

    console.log("url -> " , req );
    // console.log("params" , req.params);
    // console.log("hello");
    // console.log("parames" , req.query);
let u = req.url.slice(req.url.indexOf('/'), req.url.lastIndexOf('/')+1);
console.log("U : ",u);
    console.log("roleid " + req.user.roleId);
    const URL = await urlModel.findOne({
      link: u,
      method: req.method,
      "Roles.roleId": req.user.roleId,
    });


    console.log("URL" + URL);
    if (!URL) throw new Error("your role not auth to use this api url");

    next();
  } catch (e) {
    myHelper.resHandler(res, 500, false, e.message, "unauthorized not admin");
  }
};

const authparams = async (req, res, next) => {
  try {
    //// console.log("url" + req.url)
    /// console.log("params" +req.params)
    console.log("hello");
    /// console.log("roleid " +req.user.roleId)

    const paramobject = Object.keys(req.params);
    const paramesval = Object.values(req.params);
    paramesval.forEach((element) => {
      if (element === paramobject) {
        console.log("done");
      }
      
    });
    console.log("obkeys",paramobject)  
    console.log("obvals",paramesval) 
      const URLparams = await urlModel.findOne({
      
      paramobject: paramesval,
    });
   
    if (!URLparams) throw new Error("nnooooo salema");
    console.log("URLparamskk" + URLparams);
    next();
   
  } catch (e) {
    myHelper.resHandler(res, 500, false, e.message, "unauthorized not param");
  }
};
module.exports = { auth, authUrl, authparams };
