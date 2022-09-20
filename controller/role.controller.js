const { validationResult } = require("express-validator");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");

module.exports = {
  //Add new Role
  addRole: async (req, res) => {
    try {
      const { name, rights } = req.body;

      const role = new roleModel({
        name,
        rights,
      });

      const roleAdd = await role.save();
      return res.status(201).send({ data: roleAdd });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
  //Get Roles List with Pagination
  getRoleList: async (req, res) => {
    try {
      let roleList = [];
      // get users according to pagination and sort them from newest to oldest.
      if (req.body.pagination) {
        const { pageSize, pageNumber } = req.body.pagination;
        roleList = await roleModel
          .find()
          .sort({ _id: -1 })
          .skip(pageSize * (pageNumber - 1))
          .limit(pageSize);
      } else {
        roleList = await roleModel.find().sort({ _id: -1 });
      }
      if (roleList && roleList !== []) {
        return res.status(200).send(roleList);
      } else {
        return res.status(200).send({ msg: "No Role exists" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
  //Delete Role by ID
  deleteRole: async (req, res) => {
    try {
      const { _id } = req.body;
      await roleModel.deleteOne({ _id });

      //Delete the role from all users, where the role is present
      await userModel.updateMany(
        { roles: { $in: [_id] } },
        { $pull: { role: _id } }
      );
      return res.status(201).send({ msg: "Role deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
  updateRole: async (req, res) => {
    try {
      const { _id } = req.body;

      //Get Role and update
      const role = await roleModel.findOneAndUpdate({ _id }, req.body);

      return res.status(200).send({ msg: "Role updated" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
};
