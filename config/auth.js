const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("hola mundo auth.js");

    return next();
  }
  //req.flash('error_msg', 'Not Authorized.');

  res.redirect("/ingresar");
};

module.exports = helpers;
