const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:5
    },
    email:{
        type:String,
        require:true,
        min:6
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('users',userSchema);
