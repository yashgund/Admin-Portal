let mongoose= require('mongoose');

let rotaractSchema = mongoose.Schema({
    name:{
        type:String,
    //    required: true
    },
    post: {
        type: String,
    //    required: true
    },
    email: {
        type:String,
        // required: true
    },
    number: {
        type:Number,
        // required: true
    },
    password:{
        type:String,
        //required:true
    }  ,
    gender:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now 

    }
});

let Admin= module.exports= mongoose.model('RaC',rotaractSchema);
// whnumber: {
//     type:Number,
//     required: true
// },
// department: {
//     type:String,
//     //required: true
// },
// address: {
//     type:String,
//     //required: true
// },