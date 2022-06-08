exports.mypageGood = (req, res) => {
    res.render("mypage-good-list");
};

exports.mypageReply = (req, res) => {
    res.render("mypage-reply-list");
};

exports.mypageWrite = (req, res) => {
    res.render("mypage-write-list");
};

exports.chatList = (req, res) => {
    res.render("chat-list");
};

exports.chatStory = (req, res) => {
    res.render("chat");
};


module.exports={
    //mypage
    qna : async (req, res, next) => {
        try {
            let qnas = await Qna.findAll();
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
    },
};