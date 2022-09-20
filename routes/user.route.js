const express = require("express");
const { validationResult } = require("express-validator");
const validationHandler = require("../helpers/validattionHandler");
const router = express.Router();

const {
  addUser,
  getUserList,
  updateUser,
} = require("../controller/user.controller");

const {
  validUser,
  validPagination,
  validUserUpdate,
} = require("../helpers/validation");

router.post("", validUser, validationHandler, addUser);

router.post("/list", validPagination, validationHandler, getUserList);

router.patch("", validUserUpdate, validationHandler, updateUser);

module.exports = router;
