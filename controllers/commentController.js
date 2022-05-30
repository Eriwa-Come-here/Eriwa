const post = require("../models/post");

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

// create
router.post('/', util.isLoggedin, checkPostId, function(req, res){ // 1
    var post = res.locals.post; // 1-1
  
    req.body.author = req.user._id; // 2
    req.body.post = post._id;       // 2
  
    Comment.create(req.body, function(err, comment){
      if(err){
        req.flash('commentForm', { _id: null, form:req.body });                 // 3
        req.flash('commentError', { _id: null, errors:util.parseError(err) });  // 3
      }
      return res.redirect('/posts/'+post._id+res.locals.getPostQueryString()); //4
    });
  });
  
  module.exports = router;
  
  // private functions
  function checkPostId(req, res, next){ // 1
    Post.findOne({_id:req.query.postId},function(err, post){
      if(err) return res.json(err);
  
      res.locals.post = post; // 1-1
      next();
    });
  }