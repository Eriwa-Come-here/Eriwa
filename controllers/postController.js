const Post = require("../models/post");

exports.showPostWriting = (req, res) => {
  res.render("post-writing");
};


// show (post-view)
exports.showPost = (req, res) => {
  Post.findOne({
    where: {
      post_id: req.params.post_id,
    },
  }, function(err, Post){
    if(err) return res.json(err);
    res.render("post-view", {post:Post});
  });
};