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
  }
};
