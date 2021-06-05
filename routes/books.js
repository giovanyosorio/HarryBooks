const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../config/auth");
const Books = require("../models/Books");
const Compras = require("../models/Compras");
const Users = require("../models/Users");

router.get("/books", isAuthenticated, async function (req, res, next) {
  console.log(req.sessionID);
  //console.log(session.user.username);
  const books = await Books.find({});

  console.log(books);
  res.render("libros", { books });
});

router.post("/comprar/:id", isAuthenticated, async function (req, res, next) {
  const book = await Books.findById(req.params.id);

  console.log("books" + book);
  console.log(req.session.passport.user.username);
  console.log(req.session.passport.user._id);
  if (book.cantidad == 0) {
    await Books.findByIdAndUpdate(req.params.id, {
      cantidad: book.cantidad,
    });
    res.redirect("/carrito");
  }
  if (book) {
    const newCompra = new Compras();
    newCompra.nombre = book.nombre;
    newCompra.valor = book.precio;
    newCompra.user_id = req.session.passport.user._id;
    newCompra.cantidad = req.body.cantidad;
    newCompra.total = book.precio * req.body.cantidad;
    await Books.findByIdAndUpdate(req.params.id, {
      cantidad: book.cantidad - newCompra.cantidad,
    });

    console.log("books canitidad ");

    await newCompra.save();
    //await book.save();

    console.log("new compra" + newCompra);
  }
  res.redirect("/books");
});

router.get("/carrito", async function (req, res, next) {
  const compras = await Compras.find({});
  // const books = await Books.find({})
  // .select("nombre -_id")
  // .select("precio -_id");
  // if (compras) {
  //   const books = await Comment.find({ book_id: book._id });
  // }
  var total = 0;
  // compras.forEach((element) => console.log((total += element.total)));

  compras.forEach(function (element) {
    total += element.total;
  });
  console.log(total);
  console.log(compras);
  //console.log(books);
  res.render("carrito", { compras, total });
  //res.render("carrito");
});

router.get("/compra/delete/:id", async (req, res) => {
  await Compras.findByIdAndDelete(req.params.id);

  console.log("eliminaod");
  res.redirect("/carrito");
});

router.get("/cancelar", async (req, res) => {
  await Compras.deleteMany();
  console.log("eliminaod");
  res.redirect("/carrito");
});

router.get("/editar/:id", async (req, res) => {
  const compra = await Compras.findById(req.params.id);
  res.render("edit", { compra });
});

router.get("/editar/:id", async (req, res) => {
  const compra = await Compras.findById(req.params.id);
  res.render("edit", { compra });
});

router.post("/edit/compra/:id", async (req, res) => {
  const { nombre, cantidad } = req.body;

  await Compras.findByIdAndUpdate(req.params.id, {
    nombre,
    cantidad,
  });
  console.log("aca debe imprimir");

  res.redirect("/carrito");
});

module.exports = router;
