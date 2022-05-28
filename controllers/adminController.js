const db = require("../models/index"),
  qna = db.qna;

//회원관리
exports.showAdminMember = (req, res) => {
  res.render("admin-member");
};

//게시물관리
exports.showAdminPost = (req, res) => {
  res.render("admin-post");
};

//통계분석
exports.showAdminAnalysis = (req, res) => {
  res.render("admin-analysis");
};

//문의내역
exports.showAdminQna = async (req, res) => {
  try {
    data = await qna.findAll();
    console.log(data);
    res.render("admin-qna", { qnas: data });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

//문의글답변
exports.showAdminQnaResponse = (req, res) => {
  res.render("admin-qna-response");
};
