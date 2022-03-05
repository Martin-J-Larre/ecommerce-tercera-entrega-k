const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    name:{ 
        type: String, 
        required:[true, "Name is required"], 
        minlength:[3, "Name can't be smaller than 3 characters"], 
        maxlength:[30, "Name can't be greater than 30 characters"]
    },
    email:{ 
        type: String,
        required:[true, "Email is required"],
        maxlength:[30, "Name can't be greater than 30 characters"],
        index:true
    },
    password:{ 
        type: String, 
        required:[true, "Password is required"]},
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
    versionKey: false 
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.password)
    console.log(result);
    return result
}


module.exports = mongoose.model("User", UserSchema);