import mongoose from "mongoose";


// user schema
const userSchema = mongoose.Schema({

    frist_name : {
        type : String,
        required : true,
        trim : true,
    },
    sur_name : {
        type : String,
        required : true,
        trim : true,
    },
    secondary_name : {
        type : String,
        required : true,
        trim : true,
    },
    username : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        trim : true
    },
    phone : {
        type : String,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    gander : {
        type : String,
        required : true,
        enum : ['Female', 'Male', 'Custom']
    },
    brith_date : {
        type : String,
        required : true,
        trim : true
    },
    profile_photo : {
        type : String,
        default : 'profile.png'
    },
    cover_photo : {
        type : String,
        default : 'cover.png'
    },
    bio : {
        type : String,
        trim : true,
        default : null
    },
    hobbies : {
        type : Array,
        default : []
    },
    work : {
        type : Array,
        default : []
    },
    education : {
        type : Array,
        default : []
    },
    featured : {
        type : Array,
        default : []
    },
    living : {
        type : String,
        default : null
    },
    home_town : {
        type : String,
        default : null
    },
    relationship : {
        type : String,
        enum : ['Married', 'Single', 'In a Relationshiop']
    },
    joined : {
        type : Date
    },    
    social : {
        type : Array,
        default : []
    },
    friends : {
        type : Array,
        default : []
    },
    flowing  : {
        type : Array,
        default : []
    },
    flowers  : {
        type : Array,
        default : []
    },
    request  : {
        type : Array,
        default : []
    },
    block  : {
        type : Array,
        default : []
    },
    post  : {
        type : Array,
        default : []
    },
    isActivate : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : true
    }

}, {
    timestamps : true
})



// export schema
export default mongoose.model(`User`, userSchema)