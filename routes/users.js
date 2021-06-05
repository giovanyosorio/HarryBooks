var express = require("express");
var router = express.Router();
var User = require("../models/Users");
const passport = require("passport");
const { isAuthenticated } = require("../config/auth");
var session = require("express-session");

/* GET users listing. */

router.get("/registrarse", function (req, res, next) {
  // console.log("hola intresar");
  res.render("registrarse");
});

// router.get("/usuarios", async function (req, res, next) {
//   // console.log("hola intresar");
//   let books = await User.find({});
//   console.log(books);
//   console.log("no sale");
// });
router.get("/ingresar", function (req, res, next) {
  if (!req.sessionID) {
    console.log(req.sessionID);
    console.log("login by users.js");
    // res.render("/");
  } else {
    res.render("ingresar");
  }
});

router.post("/registrarse", async function (req, res, next) {
  const { name, username, password, password2 } = req.body;

  if (name.length <= 0) {
    res.send("ingrese el nombre");
  }
  if (password != password2) {
    res.send("las contraseñas no coinciden");
  }
  if (password.length < 4) {
    res.send("contraseña muy corta");
  } else {
    const newUsuario = new User({
      name,
      username,
      password,
      password2,
    });
    console.log(newUsuario);
    newUsuario.password = await newUsuario.encryptPassword(password);

    await newUsuario.save();
    console.log("registro exitoso");
    res.render("ingresar");
  }
});
// Login
router.post(
  "/ingresar",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/ingresar",
    failureFlash: true,
  })
);

// router.get("/carrito", function (req, res, next) {
//   res.render("carrito");
// });
module.exports = router;
