const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt=require("jsonwebtoken")
// const User = mongoose.model("User", {
const projectSchema = mongoose.Schema({
    nameProject:{
        type:String,
    },
     typeProject:{
        type:String,
      
    },
    img:{
        type:String,
       
    },
    area:[{
        type:Array, 
        // name:String,
        building: [{
            type:Array,
            name:String,
            floor:[
                { 
                type:Number
            }
            ],
            unite:[{
                type:Array,
                price:{
                    type:Number,
                },
                name:{
                    type:String,
                },
                status:{
                    type:Boolean
                },
            }]   
        }]
       
    }], 
    

    // roleId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Role",
    //  },
    // urlId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"URL",
    //  },
     tokens:[{
        token:{ type:String, required: true}
}]
    
}, {
    timestamps:true
})

// userSchema.methods.generateToken = async function(){
//     const userData = await this.populate("roleId unitId");
//     console.log("Data : ", userData);
//     const token = jwt.sign({_id: userData._id , userType: userData.roleId.userType,unite:userData._id,unite:userData.unitId.unite }, process.env.tokenPass)
//     userData.tokens = userData.tokens.concat({token})
//     // userData.tokens.push({token})
//     await userData.save()
//     return token
// }

// projectSchema.methods.generateArea=async function(){
//     console.log("dataArea",areData)
//     const areData= this.area
//     console.log("dataArea",areData)
//       const area={_id:areData._id}
//       console.log("dataArea",areData)
//     areData.area.push({area})
//     console.log("dataArea",areData)
    
// }
projectSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.__v
    delete data.password
    return data
}
// projectSchema.methods.generateToken = async function(){
//     const userData = await this.populate("roleId");
//     console.log("Data : ", userData);
//     const token = jwt.sign({_id: userData._id , userType: userData.roleId.userType }, process.env.tokenPass)
//     userData.tokens = userData.tokens.concat({token})
//     // userData.tokens.push({token})
//     await userData.save()
//     return token
// }
const Project = mongoose.model("Project", projectSchema)
module.exports=Project
// module.exports = mongoose.model("User", userSchema)


//token admin

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E5Y2YzMDc0ZjUyMTU1YTc0YjhlMzYiLCJpYXQiOjE2NzIwNzMwMjJ9.8nhvHOzOeWNAw78MfSAHfv3qnsv2zcErhVWCGJ6wps0



//token 