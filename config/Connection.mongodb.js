let mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://Jared:3S38hPyDnWQbXNwj@cluster0.4swhp.mongodb.net/SAS?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
);
