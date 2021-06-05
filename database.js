const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("useFindAndModify", false);
mongoose
  .connect(`mongodb+srv://go:e3b3b8454@cluster0.3waul.mongodb.net/HarryBooks`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((db) => console.log(`DB is connected ${process.env.NODE_ENV}`))

  .catch((err) => console.error(err));
