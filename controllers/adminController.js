const db = require("../models/index"),
  Qna = db.qna,
  User = db.user,
  Post = db.post;
const Sequelize = require("sequelize");
const sequelize = db.sequelize;

module.exports = {
  //회원관리
  showAdminMember: async (req, res, next) => {
    try {
      const [memberData, metadata] = await sequelize.query("SELECT * FROM `user`", {
        type: Sequelize.SELECT,
      });
      console.log(memberData);
      res.locals.user = memberData;
      res.render("admin-member", { users: memberData });
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  memberDelete: async (req, res, next) => {
    let user_id = req.body.user_id;
    try {
      await sequelize.query("DELETE FROM `user` WHERE user_id = ?", {
        type: Sequelize.DELETE,
        replacements: [user_id]
      });
      res.redirect ("/admin-member");
      next();
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  //게시물관리
  showAdminPost: (req, res) => {
    res.render("admin-post");
  },

  //통계분석
  showAdminAnalysis: (req, res) => {
    res.render("admin-analysis");
  },

  //문의내역
  showAdminQna: async (req, res) => {
    try {
      qnaData = await Qna.findAll();
      console.log(qnaData);
      res.render("admin-qna", { qna: qnaData });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  //문의글답변
  showAdminQnaResponse: (req, res) => {
    res.render("admin-qna-response");
  },
};
