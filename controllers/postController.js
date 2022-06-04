const multer = require("multer");
const path = require("path");
const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const Post = require("../models/post");
const datefunc = require("../public/js/datefunc.js");

// show
exports.showPost = async (req, res) => {
  try {
    const [result, metadata] = await sequelize.query(
      "SELECT * FROM `post` WHERE post_id = ?",
      {
        type: Sequelize.SELECT,
        replacements: [req.params.post_id],
      }
    );
    console.log(result);
    res.render("post-view", { post: result[0], getDate: datefunc.getDate });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.showPostWriting = (req, res) => {
  res.render("post-writing");
};

//img 저장경로, 파일명 변경
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cd(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cd(null, path.basename(file.originalname, extname) + Date.now() + extname);
//   },
// });
// const upload = multer({ storage: storage });

exports.create = async (req, res, next) => {
  try {
    await Post.create({
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      place_name: req.body.place_name,
      place_type: req.body.place_type,
      img: `/images/{req.body.img}`,
      grade: req.body.grade,
      can_park: req.body.can_park,
      can_pet: req.body.can_pet,
    });
    res.render("/");
  } catch (error) {
    console.log(`Error fetching Post by ID: ${error.message}`);
    next(error);
  }
};

exports.edit = async (req, res) => {};
exports.delete = async (req, res) => {};
