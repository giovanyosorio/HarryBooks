const request = require("supertest");
const express = require("express");
const router = express.Router();

test("should register", async () => {
  await request(router)
    .post("/registarse")
    .send({
      name: "giovany",
      username: "gio",
      password: "12345",
      password2: "12345",
    })
    .expect(200);
});
test("should ingresar", async () => {
  await request(router)
    .post("/ingresar")
    .send({
      username: "gio",
      password: "12345",
    })
    .expect(200);
});

// test("It adds two numbers", () => {
//   expect(1 + 1).toBe(2);
// });
