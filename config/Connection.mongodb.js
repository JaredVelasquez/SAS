let mongoose = require("mongoose");
let dbConnection = require("../env/devConnection");

mongoose.connect(
    process.env.MONGODB,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
);