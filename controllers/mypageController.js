const passport = require("passport");

const db = require("../models/index"), 
    Qna = db.qna,
    Recommend = db.recommend,
    Post = db.post,
    User = db.user,
    getUserParams = body => {
        return {
            user_id:body.user_id,
            password: body.password,
            password2: body.password2,
            nickname: body.nickname,
            email: body.email
        };
    };
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

    },

    edit: async (req, res, next) => {
        let userId = req.params.id,
        userParams = getUserParams(req.body);

        delete userParams.user_id;
        if(userParams.password == null) delete userParams.password;
        if(userParams.nickname == null) delete userParams.nickname;
        if(userParams.email == null) delete userParams.email;

        console.log(userParams);
        try {
            let user = await User.findByPkAndUpdate(userId, userParams);
            
            req.flash("success", "성공적으로 변경했습니다!");
            res.locals.redirect = `/mypage`;
            res.locals.user = user;
            next();

        } catch (error) {
            next(error);
        }

    },

    showUpdate : (req, res) => {
        res.render("mypage-repair");
    },

    passwordCheck : passport.authenticate ("local", {
        successRedirect: "/mypage/update",
        failureRedirect: "/mypage/passwordCheck",
        failureFlash: "Failed to login.",
        successFlash:"Logged in!"

    }),
    

    logout: async (req, res, next)=>{
        req.logout((err)=>{
            next();
        })
    },

    showPasswordCheck : (req, res) => {
        res.render("mypage-password-check");
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath!= undefined) res.redirect(redirectPath);
        else next();
    }


};