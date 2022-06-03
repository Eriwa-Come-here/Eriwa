const db = require("../models/index"),
  user = db.user,
  post = db.post,
  qna = db.qna,
  recommend = db.recommend,
  getUserParams = (body) => {
    return {
      title: body.title,
    };
  };

module.exports = {
  showIndex: async (req, res, next) => {
    res.render("index");
  },

  showBoard: (req, res, next) => {
    res.render("board");
  },

  showDetailSearch: (req, res, next) => {
    res.render("detail-search");
  },

  //mypage
  showQna: (req, res, next) => {
    res.render("mypage-qna");
  },

  showRecommend: (req, res, next) => {
    res.render("mypage-recommend");
  },

  //service-intro
  showServiceIntro: (req, res, next) => {
    res.render("service-intro");
  },
};
