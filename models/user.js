const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual for user's listings
userSchema.virtual('listings', {
    ref: 'Listing',
    localField: '_id',
    foreignField: 'owner'
});

// Ensure virtuals are included when converting to JSON/Object
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);