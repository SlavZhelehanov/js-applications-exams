import {model, Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Name field can't be empty"],
        unique: [true, "Username already exists"],
        trim: true,
        minLength: [5, "Username should be at least 5 characters long"],
        maxLength: [32, "Username should be maximum 32 characters long"]
    },
    // name: {
    //     type: String,
    //     required: [true, "Name field can't be empty"],
    //     minLength: [2, "The name should be at least 2 characters long"],
    //     maxLength: [32, "The name should be maximum 32 characters long"]
    // },
    cart: [],
    // email: {
    //     type: String,
    //     required: [true, "Email field can't be empty"],
    //     minLength: [10, "The email should be at least 10 characters long"]
    // },
    // followers: [{
    //     type: String
    // }],
    // following: [{
    //     type: String
    // }],
    userId: {
        type: String,
        required: [true, "User ID field can't be empty"],
    },
    password: {
        type: String,
        required: [true, "Password field can't be empty"],
    }
}, {timestamps: true});

// userSchema.pre('save', async function () {
//     if (this.isModified('password')) {
//         if (this.password.length < 4) throw new Error('The password should be at least 4 characters long');
//
//         try {
//             this.password = await bcrypt.hash(this.password, 10);
//         } catch (error) {
//             return error;
//         }
//     }
// });

// userSchema.methods.checkPassword = async function (enteredPassword) {
//     try {
//         return await bcrypt.compare(enteredPassword, this.password);
//     } catch (err) {
//         throw new Error('Error comparing passwords');
//     }
// };

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    if (this.password.length < 4) {
        throw new Error('The password should be at least 4 characters long');
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);