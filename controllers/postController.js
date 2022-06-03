const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
const post = require('../models/post');
const datefunc = require('../public/js/datefunc.js');

exports.showPostWriting = (req, res) => {
  res.render("post-writing");
};

// show
exports.showPost = async (req, res) => {
  try {
    const [result, metadata] = await sequelize.query("SELECT * FROM `post` WHERE post_id = ?", {
      type: Sequelize.SELECT,
      replacements: [req.params.post_id]
    });
    console.log(result);
    res.render("post-view", {post: result[0], getDate: datefunc.getDate});
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
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
