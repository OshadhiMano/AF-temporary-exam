const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let List= new Schema({
    name:{
        type:String
    },
    age:{
        type: String
    },
    address:{
        type:String
    },
    nic:{
        type:String
    },
    nationality:{
        type:String
    },
    bloodGrp:{
        type:String
    },
    hotel:{
        type:String
    },
    guid:{
        type:String
    },
    cancele:{
        type:Boolean
    }
});

module.exports=mongoose.model('List',List);