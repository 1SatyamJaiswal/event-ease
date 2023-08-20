import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    age: {
        type: 'number',
        required: true,
    },
    city: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    }
})

export default mongoose.model('User',userSchema);