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
        const [result, metadata] = await sequelize.query("SELECT `n`.*, `u`.`nickname` AS `send_user_nickname` FROM `note` AS `n` LEFT JOIN `user` AS `u` ON `u`.`user_id` = `n`.`send_user_id` WHERE `n`.`receive_user_id` = ? ORDER BY `n`.`written_date` DESC", {
          type: Sequelize.SELECT,
          replacements: [res.locals.currentUser.dataValues.user_id]
      });
      res.render("receive-note-list", {type: req.params.type, notes: result, getDate: datefunc.getDate});
      } else if (req.params.type == "send") {
        const [result, metadata] = await sequelize.query("SELECT `n`.*, `u`.`nickname` AS `receive_user_nickname` FROM `note` AS `n` LEFT JOIN `user` AS `u` ON `u`.`user_id` = `n`.`receive_user_id` WHERE `n`.`send_user_id` = ? ORDER BY `n`.`written_date` DESC", {
          type: Sequelize.SELECT,
          replacements: [res.locals.currentUser.dataValues.user_id]
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

  //create
  noteWrite : async (req, res, next) => {
    var date = new Date();
    try {
      if (req.body.recipient && req.body.new_note_content) {
        const [user, metadata] = await sequelize.query("SELECT `user_id` FROM `user` WHERE `nickname` = ?",{
          type: Sequelize.SELECT,
          replacements: [req.body.recipient]
        });
        if (user[0]) {
          console.log(req.body)
          await sequelize.query("INSERT INTO `note`(`receive_user_id`, `send_user_id`, `note_content`, `written_date`) VALUES (?, ?, ?, ?)", {
            type: sequelize.QueryTypes.INSERT,
            replacements: [user[0].user_id, req.body.note_author_id, req.body.new_note_content, date]
          });
          await sequelize.query("INSERT INTO `event`(`user_id`, `event_type`, `event_author`, `event_content`, `url_address`, `event_date`) VALUES (?, ?, ?, ?, ?, ?)", {
            type: sequelize.QueryTypes.INSERT,
            replacements: [user[0].user_id, '쪽지', req.body.note_author_nickname, req.body.new_note_content, `/note/receive`, date]
          });
          req.flash("success", `${req.body.recipient}에게 쪽지를 보냈습니다`);
        } else {
          req.flash("error", `${req.body.recipient}이(가) 존재하지 않습니다`);
        }
      } else {
        req.flash("error", "내용을 입력해 주세요");
      }
      res.redirect(req.body.url);
    } catch (err) {
      next(err);
    }
  }
};
