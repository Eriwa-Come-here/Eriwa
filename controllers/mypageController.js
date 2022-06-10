const db = require("../models/index"), 
    Qna = db.qna;

module.exports={
    mypageGood : (req, res) => {
        res.render("mypage-good-list");
    },

    mypageReply : (req, res) => {
        res.render("mypage-reply-list");
    },

    mypageWrite : (req, res) => {
        res.render("mypage-write-list");
    },

    chatList : (req, res) => {
        res.render("chat-list");
    },

    chatStory : (req, res) => {
        res.render("chat");
    },

    qna : async (req, res, next) => {
        try {
            let qnas = await Qna.findAll({
                where: {user_id : res.locals.currentUser.user_id}
            });
            res.locals.qnas = qnas;
            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }
    },

    showQna : (req, res) => {
        res.render("mypage-qna");
    },
        
    showRecommend : (req, res) => {
        res.render("mypage-recommend");
    }
};