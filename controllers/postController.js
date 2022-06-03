const db = require("../models/index"),
  post = db.post;
(multer = require("multer")), (path = require("path"));

//img 저장경로, 파일명 변경
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cd(null, "public/images");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cd(null, path.basename(file.originalname, origin) + extname);
  },
});
upload = multer({ storage: storage });

// show (post-view)
exports.showPost = (req, res) => {
  post.findOne(
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

exports.showPostWriting = (req, res) => {
  res.render("post-writing");
};

exports.create = async (req, res, next) => {
  try {
    await post.create({
      // user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      place_name: req.body.place_name,
      place_type: req.body.place_type,
      img: `/images/{req.body.img}`,
      grade: req.body.grade,
      can_park: req.body.can_park,
      can_pet: req.body.can_pet,
    });
    res.render("board");
  } catch (error) {
    console.log(`Error saving post: ${error.message}`);
    next(error);
  }
};

exports.edit = async (req, res) => {};
exports.delete = async (req, res) => {};
