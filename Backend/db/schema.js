const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://codewickk:18048448@crackeddb.uzjcf.mongodb.net/")

const studentSchema = mongoose.Schema({
    _studentId: mongoose.Schema.Types.ObjectId,
    firstName : String,
    lastName : String,
    email :String,
    password : String
})

const educatorSchema = mongoose.Schema({
    _educatorId: mongoose.Schema.Types.ObjectId,
    firstName : String,
    lastName : String,
    email :String,
    password : String
})

const courseSchema = mongoose.Schema({
    title : String,
    price : String,
    description:String,
    category:String,
    uploadDate : {
        type:Date , default:Date.now
    },
    educatorId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Educator",
        required:true
    },
    thumbnail:String,
    videoURL:String,
})

const purchasedSchema = mongoose.Schema({
    studentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref :"Student",
        required:true
    },
    courseId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    }
})

const userProfileSchema = mongoose.Schema({
    firstName:String,
    userName:String,
    bio:String,
    socialLinks:{
        linkedin:String,
        twitter:String,
        portfolio:String
    },
    profilePicture:String,
    educatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Educator",
        required: true
    }
})

const Student = mongoose.model('Student',studentSchema);
const Educator = mongoose.model('Educator',educatorSchema);
const Course = mongoose.model('Course', courseSchema)
const Purchase = mongoose.model('Purchase', purchasedSchema)
const UserProfile = mongoose.model('UserProfile',userProfileSchema)

module.exports = {Student , Educator , Course , Purchase , UserProfile}