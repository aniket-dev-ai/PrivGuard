import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateProfilePic from '../Utils/generateProfilePic.js';

const userSchema = Schema({
    Email:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    PassHashed:{
        type:String,
        required:true
    },
    profilePic:{
        type:String, 
        default: function () {
            return generateProfilePic(this.FirstName, this.LastName); // ✅ Auto-generate profile pic
        }
    },


    // sharedData:[
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:'SharedData'
    //     }
    // ],
    // savedFakePresets:[
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:'FakePreset'
    //     }
    // ]
    breachAlert:[{
        type:String
    }]
},{
    timestamps:true
})

userSchema.methods.hashPassword = async function(password){
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password:', error);
    }   
}

userSchema.methods.comparePassword = async function(password){
    try {
        return await bcrypt.compare(password, this.PassHashed);
    } catch (error) {
        throw new Error('Error comparing password:', error);
    }
}

userSchema.methods.generateAuthToken = function(){
    try {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        console.log('Error generating token:', error);
        throw new Error('Error generating token:', error);
    }
}

const User = mongoose.model('User', userSchema);
export default User;