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
      next();
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  }
  /*
  createComment: async (req, res) => {
    Comment.create({
      post_id: req.params.post_id,
      user_id: 'test2222', // 나중에 수정하기
      comment: "test data",//req.body.comment_content,
      written_date: new Date()
    }).then(result => {
      res.redirect("/board/post-view");
    }). catch(err => {
      res.status(500).send({
        message: err.message,
      });
    });
  }*/
};
