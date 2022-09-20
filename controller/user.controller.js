const { validationResult } = require("express-validator");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");

module.exports = {
  //Add new User
  addUser: async (req, res) => {
    try {
      const { firstName, lastName, eMail, phone, roles } = req.body;

      const user = new userModel({
        firstName,
        lastName,
        eMail,
        phone,
        roles,
      });
      const userAdd = await user.save();
      return res.status(201).send({ data: userAdd });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
  //Get User List with Pagination
  getUserList: async (req, res) => {
    try {
      const { pageSize, pageNumber } = req.body.pagination;
      // get users according to pagination and sort them from newest to oldest.
      const userList = await userModel
        .find()
        .sort({ _id: -1 })
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize);

      if (userList) {
        for (user of userList) {
          if (user.roles) {
            const roles = await roleModel.find(
              { _id: { $in: user.roles } },
              { name: 1 }
            );
            user.roles = roles;
          }
        }
        const totalElements = await userModel.count();
        return res.status(200).send({ data: userList, totalElements });
      } else {
        return res.status(200).send({ msg: "No User exists" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { _id } = req.body;

      //Get User
      const user = await userModel.findOneAndUpdate({ _id }, req.body);

      return res.status(200).send({ msg: "User updated" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
};
