
const mongoose = require("mongoose");
 
mongoose.connect("mongodb+srv://hiteshnavare:AvHv1ImcFG5OPJdI@cluster0.j1065.mongodb.net/paytm-karo")

const UserSchema =new mongoose.Schema({
    fristName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const userModel = mongoose.model("user", UserSchema);