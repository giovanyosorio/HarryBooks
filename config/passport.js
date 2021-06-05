const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/Users");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      // Match Email's User
      //const user = await User.find({$or:[{email:email},{username:username}]});
      //es verdad bro
      const user = await User.findOne({ username: username });
      if (!user) {
        console.log("'Not User found.'");
      } else {
        // Match Password's User
        console.log("user" + user);
        console.log(user.password);
        const match = await user.matchPassword(password);

        if (match) {
          // loginUser(email,password);
          console.log("login user en passport");
          return done(null, user);
        } else {
          console.log("'incorrect password.'");
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
//toma un id y genera un usuario
//busca en la base de datos, toma el id y retorna el error
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
