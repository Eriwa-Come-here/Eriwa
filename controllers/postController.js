const post = require("../models/post");
const Post = require("../models/post");

exports.showPostWriting = (req, res) => {
  res.render("post-writing");
};

// show (post-view)
exports.showPost = (req, res) => {
  Post.findOne(
    {
      where: {
        post_id: req.params.post_id,
      },
    },
    function (err, post) {
      if (err) return res.json(err);
      res.render("post-view", { post: post });
    }
  );
};

exports.savePost = async (req, res) => {
  try {
    await post.create({
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      place_name: req.body.place_name,
      place_type: req.body.place_type,
      // img:req.body.img,
      grade: req.body.grade,
      can_park: req.body.can_park,
      can_pet: req.body.can_pet,
    });
    res.render("board");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
