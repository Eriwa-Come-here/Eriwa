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


//notice
exports.showNotice = (req, res) => {
    res.render("notice");
};

//service-intro
exports.showNotice = (req, res) => {
    res.render("service-intro");
};