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
