const multer = require("multer");
const path = require("path");
const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const datefunc = require("../public/js/datefunc.js");

// show
exports.showPost = async (req, res) => {
  try {
    const [post, post_metadata] = await sequelize.query(
      "SELECT `post`.*, COUNT(`recommend`.`user_id`) AS `recommend_count` FROM `post` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` GROUP BY `post`.`post_id` HAVING `post`.`post_id` = ?",
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
    //res.render("post-view", {post: post[0], recommend_count: recommend[0].conut, comments: comments, getDate: datefunc.getDate});
    res.render("post-view", {
      post: post[0],
      comments: comments,
      getDate: datefunc.getDate,
    });
  } catch (err) {
    console.log(`Error fetching Post by ID: ${error.message}`);
    next(error);
  }
};

exports.showPostWriting = (req, res) => {
  res.render("post-writing");
};

exports.showPostEdit = (req, res) => {
  res.render("post-edit");
};

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
          req.file.filename,
          req.body.grade,
          new Date(),
          req.body.post_author,
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

exports.editPost = async (req, res, next) => {
  try {
    await sequelize.query("UPDATE `post` SET (`title`=?,`content`=?,`address1`=?,`address2`=?,`address3`=?,`place_name`=?,`place_type`=?,`image`=?,`grade`=?,`can_park`=?,`can_pet`=? )  WHERE `post_id` = ?;", {
      type: sequelize.QueryTypes.UPDATE,
      replacements: [req.body.title, req.params.content, req.body.address1, req.body.address2, req.body.address3,
        req.body.place_name, req.body.place_type, req.file.filename, req.body.grade, req.body.can_park,
        req.body.can_pet]
    });
    console.log(req.body.url);
    res.redirect("/board/post-view/" + req.params.post_id);
  } catch (err) {
    console.log(`${err.message}`);
    next(err);
  }
},

exports.deletePost = async (req, res, next) => {
  let post_id = req.params.post_id;
  try {
    await sequelize.query("DELETE FROM `post` WHERE post_id = ?", {
      type: Sequelize.DELETE,
      replacements: [post_id],
    });
    res.redirect("/");
    next();
  } catch (error) {
    console.log(`Error fetching User by ID: ${error.message}`);
    next(error);
  }
};
