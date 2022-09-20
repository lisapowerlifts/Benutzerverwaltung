const { body } = require("express-validator");

const rightModel = require("../models/right.model");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");

exports.validUser = [
  body("firstName").isString(),
  body("lastName").isString(),
  body("eMail")
    .isEmail()
    .custom(async (eMail) => {
      const user = await userModel.findOne({ eMail });
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    }),
  body("phone").optional().isString(),
  body("roles").optional().isArray(),
  body("roles.*")
    .optional()
    .isString()
    .custom(async (role) => {
      const myRole = await roleModel.findOne({ _id: role });
      if (!myRole) {
        return Promise.reject("Role does not exist");
      }
    }),
];
exports.validUserUpdate = [
  body("_id")
    .isString()
    .custom(async (_id) => {
      const user = await userModel.findOne({ _id });
      if (!user) {
        return Promise.reject("User does not exist.");
      }
    }),
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("eMail")
    .optional()
    .isEmail()
    .custom(async (eMail) => {
      const user = await userModel.findOne({ eMail });
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    }),
  body("phone").optional().isString(),
  body("roles").optional().isArray(),
  body("roles.*")
    .optional()
    .isString()
    .custom(async (role) => {
      const user = await roleModel.findOne({ _id: role });
      if (!role) {
        return Promise.reject("Role does not exist");
      }
    }),
];
exports.validPagination = [
  body("pagination.pageNumber").optional().isInt({ min: 1 }),
  body("pagination.pageSize").optional().isInt({ min: 1 }),
];

exports.validRight = [
  body("name")
    .isString()
    .isString()
    .custom(async (name) => {
      const right = await rightModel.findOne({ name });
      if (right) {
        return Promise.reject("Name is already taken");
      }
    }),
];

exports.validRightDelete = [
  body("_id")
    .isString()
    .custom(async (_id) => {
      const right = await rightModel.findOne({ _id });
      if (!right) {
        return Promise.reject("Right does not exist.");
      }
    }),
];

exports.validRole = [
  body("name")
    .isString()
    .custom(async (name) => {
      const role = await rightModel.findOne({ name });
      if (role) {
        return Promise.reject("Name is already taken");
      }
    }),
  body("rights").isArray(),
  body("rights.*")
    .isString()
    .custom(async (_id) => {
      const right = await rightModel.findOne({ _id });
      if (!right) {
        return Promise.reject("Right does not exist.");
      }
    }),
];
exports.validRoleUpdate = [
  body("_id").isString,
  body("name")
    .isString()
    .isString()
    .custom(async (name) => {
      const role = await roleModel.findOne({ name });
      if (role) {
        return Promise.reject("Name is already taken");
      }
    }),
  body("rights").isArray(),
  body("rights.*")
    .isString()
    .custom(async (_id) => {
      const right = await rightModel.findOne({ _id });
      if (!right) {
        return Promise.reject("Right does not exist.");
      }
    }),
];

exports.validRoleDelete = [
  body("_id")
    .isString()
    .custom(async (_id) => {
      const role = await roleModel.findOne({ _id });
      if (!role) {
        return Promise.reject("Role does not exist.");
      }
    }),
];
