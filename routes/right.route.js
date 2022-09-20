const express = require("express");
const router = express.Router();
const validationHandler = require("../helpers/validattionHandler");

const {
  addRight,
  getRightList,
  deleteRight,
} = require("../controller/right.controller");

const {
  validPagination,
  validRight,
  validRightDelete,
} = require("../helpers/validation");

router.post("", validRight, validationHandler, addRight);

router.post("/list", validPagination, validationHandler, getRightList);
router.delete("", validRightDelete, validationHandler, deleteRight);

module.exports = router;
