exports.showIndex = (req, res) => {
    res.render("index");
}

exports.showBoard = (req, res) => {
    res.render("board");
};

exports.showDetailSearch = (req, res) => {
    res.render("detail-search");
};



//mypage
exports.showQna = (req, res) => {
    res.render("mypage-qna");
};

exports.showRecommend = (req, res) => {
    res.render("mypage-recommend");
};