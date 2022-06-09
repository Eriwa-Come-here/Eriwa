const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;


module.exports = {
  // create
  createComment: async (req, res, next) => {
    var date = new Date();
    try {
      await sequelize.query("INSERT INTO `comment`(`post_id`, `user_id`, `comment`, `written_date`) VALUES (?, ?, ?, ?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: [req.params.post_id, req.body.comment_author, req.body.comment_content, date]
      });
      await sequelize.query("INSERT INTO `event`(`user_id`, `event_type`, `event_author`, `event_title`, `event_content`, `url_address`, `event_date`) VALUES (?, ?, ?, ?, ?, ?, ?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: [req.body.post_author, '댓글', req.body.comment_author, req.body.post_title, req.body.comment_content, `/board/post-view/${req.params.post_id}`, date]
      });
      res.redirect("/board/post-view/" + req.params.post_id);
    } catch (err) {
      console.log(`${err.message}`);
      next(err);
    }
  },

  // update
  updateComment: async (req, res, next) => {
    try {
      await sequelize.query("UPDATE `comment` SET `comment` = ? WHERE `post_id` = ? AND `comment_id` = ?;", {
        type: sequelize.QueryTypes.UPDATE,
        replacements: [req.body.comment_content, req.params.post_id, req.body.comment_id]
      });
      console.log(req.body.url);
      res.redirect("/board/post-view/" + req.params.post_id);
    } catch (err) {
      console.log(`${err.message}`);
      next(err);
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
