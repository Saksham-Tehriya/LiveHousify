const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email:{
        type:String,
        required: true
    },
});

userSchema.plugin(passportLocalMongoose); //it will automatically implement USERNAME, HASH PSWD AND SALTING AUTOMATICALLY IN USERSCHEMA,
//it also adds some methods alsoooo in our schema

module.exports = mongoose.model('User', userSchema);