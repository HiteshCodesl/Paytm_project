
const mongoose = require("mongoose");
 
mongoose.connect("mongodb+srv://hiteshnavare:zPQHcEsRU26V3i7e@cluster0.j1065.mongodb.net/paytm-karo")

const userSchema =new mongoose.Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
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

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}