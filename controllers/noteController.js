const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
const datefunc = require("../public/js/datefunc.js");

module.exports = {
  chatStory : (req, res) => {
    res.render("note");
  },

  noteList: async (req, res, next) => {
    try {
      if (req.params.type == "receive") {
        const [result, metadata] = await sequelize.query("SELECT * FROM `note` WHERE `receive_user_id` = ? ORDER BY `written_date` DESC", {
          type: Sequelize.SELECT,
          //replacements: [res.locals.currentUser.dataValues.user_id]
          replacements: ['qwerty1253']
      });
      res.render("receive-note-list", {type: req.params.type,notes: result, getDate: datefunc.getDate});
      } else if (req.params.type == "send") {
        const [result, metadata] = await sequelize.query("SELECT * FROM `note` WHERE `send_user_id` = ? ORDER BY `written_date` DESC", {
          type: Sequelize.SELECT,
          //replacements: [res.locals.currentUser.dataValues.user_id]
          replacements: ['qwerty1253']
      });
      res.render("send-note-list", {notes: result, getDate: datefunc.getDate});
      } else {
        next();
      }
    } catch (err) {
      console.log(`${err.message}`);
      next(err);
    }
  },

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
  }
};
