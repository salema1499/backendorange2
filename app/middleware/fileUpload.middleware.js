 const multer = require("multer")
   const  path  = require("path")
// // // const upload = multer({ dest: 'uploads/' })
// // const storage = multer.diskStorage({
// //     // destination:(req,file,cb)=>{
// //     //     cb(null,"uploads/")
// //     // },
// //     // filename: (req,file, cb)=>{
// //     //     const ext = file.originalname.split(".").pop()
// //     //     const newName = Date.now()+"testApp."+ext
// //     //     cb(null, newName)
// //     // }
// //     destination:(req,file,cb)=>{
// //       cb(null,"images")
// //     },
// //     filename:(req,file,cb)=>{
// //       console.log(file)
// //       cb(null,Date.now() + path.extname(file.originalname))
// //     }
// // })
// // const upload = multer({
// //     storage,
// //     // limits:{fileSize:2000000},
// //     // fileFilter: (req, file, cb) => {
// //     //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
// //     //       cb(null, true);
// //     //     } else {
// //     //       cb(null, false);
// //     //       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
// //     //     }
// //     //   }        
// // })
// // module.exports = upload


const storage=multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    console.log("File : ", file);
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload=multer({
  storage:storage,
  limits:{fieldSize:10}
})

 module.exports = upload