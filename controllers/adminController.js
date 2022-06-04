const db = require("../models/index"),
  Qna = db.qna,
  User = db.user,
  Post = db.post;

module.exports = {
  //회원관리
  showAdminMember: async (req, res, next) => {
    try {
      memberData = await User.findAll();
      console.log(memberData);
      res.locals.user = memberData;
      res.render("admin-member", { user: memberData });
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  memberDelete: async (req, res, next) => {
    let user_id = req.params.user_id;
    try {
      let user = await User.findByPkAndRemove(user_id);
      res.redirect = "/admin-member";
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
