const db = require("../models/index"),
    User = db.User,
    Post = db.Post,
    Qna = db.Qna,
    Recommend = db.Recommend,
    getUserParams = body => {
        return{
            title: body.title
        };
    };

module.exports={
    showIndex : async (req, res, next) => {
        res.render("index");
    },
    
    showBoard : (req, res, next) => {
        res.render("board");
    },
    
    showDetailSearch : (req, res, next) => {
        res.render("detail-search");
    },
    
    
    
    //mypage
    showQna : (req, res, next) => {
        res.render("mypage-qna");
    },
    
    showRecommend : (req, res, next) => {
        res.render("mypage-recommend");
    },
    
    
    //notice
    showNotice : (req, res, next) => {
        res.render("notice");
    },
    
    //service-intro
    showServiceIntro : (req, res, next) => {
        res.render("service-intro");
    }

};

