const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt=require("jsonwebtoken")
// const User = mongoose.model("User", {
const userSchema = mongoose.Schema({
    fName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 5,
        maxLength:20,
        required:true
    }, 
    lName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 5,
        maxLength:20,
        required:true
    }, 
    age:{
        type:Number,
        min:21,
        max:60,
        default:21
    }, 
    email:{
        type:String, 
        trim:true,
        lowercase:true,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    }, 
   
    password:{
        type:String, 
        trim:true,
        minLength: 5,
        required:true,
        // match: ''
    }, 
    gender:{
        type:String, 
        trim:true,
        lowercase:true,
        enum: ["male", "female"]
    }, 
    
    phoneNum:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
        }
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
     },

     unitId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    
     tokens:[{
        token:{ type:String, required: true}
}]
    
}, {
    timestamps:true
})
userSchema.pre("save", async function(){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 8)
    }
})
userSchema.statics.loginUser = async(email, password) => {
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const validatePassword = await bcryptjs.compare(password, userData.password)
    if(!validatePassword) throw new Error("invalid password")
    return userData
}
userSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.__v
    delete data.password
    return data
}
userSchema.methods.generateToken = async function(){
    const userData = await this.populate("roleId unitId");
    const fname=await this.fName
    console.log("Data : ", userData);
    console.log("Datafn : ", fname);
    const token = jwt.sign({_id: userData._id , userType: userData.roleId.userType}, process.env.tokenPass)
    userData.tokens = userData.tokens.concat({token})
    // userData.tokens.push({token})
    await userData.save()
    return token
}
const User = mongoose.model("User", userSchema)
module.exports=User
// module.exports = mongoose.model("User", userSchema)


//token admin

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E5Y2YzMDc0ZjUyMTU1YTc0YjhlMzYiLCJpYXQiOjE2NzIwNzMwMjJ9.8nhvHOzOeWNAw78MfSAHfv3qnsv2zcErhVWCGJ6wps0



//token unite:userData._id,unite:userData.unitId.unite 