const db = require("../models/index"), 
    Qna = db.qna,
    Recommend = db.recommend,
    Post = db.post;
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const datefunc = require('../public/js/datefunc.js');

module.exports={
    mypageGood : (req, res) => {
        res.render("mypage-good-list");
    },

    mypageReply : async (req, res, next) => {
        try {
          const [commentData, metadata] = await sequelize.query(
            "SELECT `comment`.* , `post`.`title` FROM `comment` LEFT JOIN `post` ON `comment`.`post_id`=`post`.`post_id` WHERE `comment`.`user_id`=?",
            { type: Sequelize.SELECT,
              replacements: [res.locals.currentUser.user_id] }
          );
          console.log(commentData);
          res.locals.comments = commentData;
          res.render("mypage-reply-list", { comment: commentData ,getDate: datefunc.getDate});
        } catch (error) {
          console.log(`Error fetching User by ID: ${error.message}`);
          next(error);
        }
      },

    mypageCommentDelete : async (req, res, next) => {
        let comment_id = req.body.comment_id;
        try {
          await sequelize.query("DELETE FROM `comment` WHERE comment_id = ?", {
            type: Sequelize.DELETE,
            replacements: [comment_id],
          });
          res.redirect("/mypage/comment");
          next();
        } catch (error) {
          console.log(`Error fetching User by ID: ${error.message}`);
          next(error);
        }
      },

    mypageWrite : async (req, res, next) => {
        try {
          const [postData, metadata] = await sequelize.query(
            "SELECT `post`.* , COUNT(`comment`.`post_id`) AS `commentCount` FROM `post` LEFT JOIN `comment` ON `post`.`post_id`=`comment`.`post_id` GROUP BY `post`.`post_id` HAVING user_id=?",
            { type: Sequelize.SELECT,
              replacements: [res.locals.currentUser.user_id] }
          );
          console.log(postData);
          res.locals.posts = postData;
          res.render("mypage-write-list", { post: postData, getDate: datefunc.getDate });
        } catch (error) {
          console.log(`Error fetching User by ID: ${error.message}`);
          next(error);
        }
      },

    mypagePostDelete : async (req, res, next) => {
        let post_id = req.body.post_id;
        try {
          await sequelize.query("DELETE FROM `post` WHERE post_id = ?", {
            type: Sequelize.DELETE,
            replacements: [post_id],
          });
          res.redirect("/mypage/post");
          next();
        } catch (error) {
          console.log(`Error fetching User by ID: ${error.message}`);
          next(error);
        }
      },

    mypageRepair : (req, res) => {
        res.render("mypage-repair");
    },

    chatList : (req, res) => {
        res.render("chat-list");
    },

    chatStory : (req, res) => {
        res.render("chat");
    },

    qna : async (req, res, next) => {
        try {
            let qnas = await Qna.findAll({
                where: {user_id : res.locals.currentUser.user_id}
            });
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

    recommend: async (req, res, next) => {
        try {
            let recommends = await Recommend.findAll({
            });
            res.locals.recommends = recommends;

            
            let posts = await Post.findAll();
            res.locals.posts = posts;

            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }

    }
};