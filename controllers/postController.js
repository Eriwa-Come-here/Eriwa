const multer = require("multer");
const path = require("path");
const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const Post = db.post;
const datefunc = require("../public/js/datefunc.js");
const { now } = require("sequelize/types/utils");

// show
exports.showPost = async (req, res) => {
  try {
    const [post, post_metadata] = await sequelize.query(
      "SELECT * FROM `post` WHERE post_id = ?",
      {
        type: Sequelize.SELECT,
        replacements: [req.params.post_id],
      }
    );
    const [recommend, recommend_metadata] = await sequelize.query(
      "SELECT COUNT(*) AS count FROM `recommend` WHERE post_id = ?",
      {
        type: Sequelize.SELECT,
        replacements: [req.params.post_id],
      }
    );
    const [comments, comment_metadata] = await sequelize.query(
      "SELECT * FROM `comment` WHERE post_id = ?",
      {
        type: Sequelize.SELECT,
        replacements: [req.params.post_id],
      }
    );
    console.log(post);
    console.log(comments);
    res.render("post-view", {
      post: post[0],
      recommend_count: recommend[0].conut,
      comments: comments,
      getDate: datefunc.getDate,
    });
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

exports.createPost = async (req, res, next) => {
  try {
    await sequelize.query(
      "INSERT INTO `post`(`title`,`content`,`address1`,`address2`,`address3`,`place_name`,`place_type`,`image`,`grade`,`written_date`,`user_id`,`can_park`,`can_pet`,`view_count`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      {
        type: sequelize.QueryTypes.INSERT,
        replacements: [
          req.body.title,
          req.body.content,
          req.body.address1,
          req.body.address2,
          req.body.address3,
          req.body.place_name,
          req.body.place_type,
          req.body.image,
          req.body.grade,
          new Date(),
          "test3333",
          req.body.can_park,
          req.body.can_pet,
          "0",
        ],
      }
    );

    res.redirect("/");
  } catch (error) {
    console.log(`Error fetching Post by ID: ${error.message}`);
    next(error);
  }
};

exports.edit = async (req, res) => {};
exports.delete = async (req, res) => {};
