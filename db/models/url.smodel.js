const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const role=require("../models/role.model")
const urlSchema = mongoose.Schema({

           link:{type:String},
           method:{
            type:String
           },
           params:{
            type:Array

           },
           query:{
            type:Array
           },
            Roles   :[
                
                {
                   roleId: {
                    type:mongoose.Schema.Types.ObjectId,
                    // required:true,
                    ref:"Role"
                   }
                }
            ]
        }
, {
    timestamps:true
})


const URL = mongoose.model("URL", urlSchema)
module.exports=URL

