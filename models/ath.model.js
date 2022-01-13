const mongoose = require("mongoose");
const {Schema} = mongoose;

const AutShema = new Schema (
    {
        username: {type: String, required: true, unique:true},
        email: {type: String, required: true, unique:true},
        hash: {type: String, required: true, unique:true},
    },
    {versionKey: false}
)

const auth = mongoose.model("Aut", AutShema);

module.exports = auth;