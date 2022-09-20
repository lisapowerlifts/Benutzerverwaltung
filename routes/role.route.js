const express = require("express");
const router = express.Router();
const validationHandler = require("../helpers/validattionHandler");

const {
  addRole,
  getRoleList,
  deleteRole,
  updateRole,
} = require("../controller/role.controller");

const {
  validPagination,
  validRole,
  validRoleDelete,
  validRoleUpdate,
} = require("../helpers/validation");

router.post("", validRole, validationHandler, addRole);

router.post("/list", validPagination, validationHandler, getRoleList);

router.delete("", validRoleDelete, validationHandler, deleteRole);

router.patch("", validRoleUpdate, validationHandler, updateRole);

module.exports = router;
