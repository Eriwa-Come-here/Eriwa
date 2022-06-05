//const Post = require("../models/post");

const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
const Comment = db.comment;


module.exports = {
  // create
  createComment: async (req, res, next) => {
    try {
      await sequelize.query(" INSERT INTO `comment`(`post_id`, `user_id`, `comment`, `written_date`) VALUES (?, ?, ?, ?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: [req.params.post_id, 'test3333', req.body.comment_content, new Date()]
      });
      res.redirect("/board/post-view/" + req.params.post_id);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  // update
  updateComment: async (req, res, next) => {
    try {
      // 쿼리 고치기
      await sequelize.query(" INSERT INTO `comment`(`post_id`, `user_id`, `comment`, `written_date`) VALUES (?, ?, ?, ?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: [req.params.post_id, 'test3333', req.body.comment_content, new Date()]
      });
      res.redirect("/board/post-view/" + req.params.post_id);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  // delete
  deleteComment: async (req, res, next) => {
    try {
      await sequelize.query("DELETE FROM `comment` WHERE `post_id` = ? AND `comment_id` = ?", {
        type: Sequelize.DELETE,
        replacements: [req.params.post_id, req.body.comment_id]
      });
      res.redirect ("/board/post-view/" + req.params.post_id);
      next();
    } catch (err) {
      console.log(`${err.message}`);
      next(err);
    }
  },
};
