const { validationResult } = require("express-validator");
const rightModel = require("../models/right.model");
const roleModel = require("../models/role.model");

module.exports = {
  //Add new Right
  addRight: async (req, res) => {
    try {
      const { name } = req.body;

      const right = new rightModel({
        name,
      });
      const rightAdd = await right.save();
      return res.status(201).send({ data: rightAdd });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
  //Get Rights List with Pagination
  getRightList: async (req, res) => {
    try {
      const { pageSize, pageNumber } = req.body.pagination;
      // get users according to pagination and sort them from newest to oldest.
      const rightList = await rightModel
        .find()
        .sort({ _id: -1 })
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize);
      if (rightList) {
        return res.status(200).send(rightList);
      } else {
        return res.status(200).send({ msg: "No Right exists" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
  //Delete Right by ID
  deleteRight: async (req, res) => {
    try {
      const { _id } = req.body;
      await rightModel.deleteOne({ _id });
      //delete Right from all Roles
      await roleModel.updateMany(
        { rights: { $in: [_id] } },
        { $pull: { role: _id } }
      );
      return res.status(201).send({ msg: "Right deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "server error" });
    }
  },
};
