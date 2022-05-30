const post = require("../models/post");

exports.showPostWriting = (req, res) => {
  res.render("post-writing");
};


// show (post-view)
exports.showPost = (req, res) => {
  post.findOne({
    where: {
      post_id: req.params.post_id,
    },
  }, function(err, post){
    if(err) return res.json(err);
    res.render("post-view", {post:post});
  });
};