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
    },
    getQnaParams = body => {
        return{
            user_id:body.user_id,
            qna_id:body.qna_id,
            question:body.question
        }
    };
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const datefunc = require('../public/js/datefunc.js');

module.exports={
    mypageGood : async (req, res, next) => {
      try {
        const [goodData, metadata] = await sequelize.query(
          "SELECT `recommend`.* ,`post`.* FROM `recommend` LEFT JOIN `post` ON `recommend`.`post_id`=`post`.`post_id` WHERE `recommend`.`user_id`=?",
          { type: Sequelize.SELECT,
            replacements: [res.locals.currentUser.user_id] }
        );
        console.log(goodData);
        res.locals.goods = goodData;
        res.render("mypage-good-list", { good: goodData ,getDate: datefunc.getDate});
      } catch (error) {
        console.log(`Error fetching User by ID: ${error.message}`);
        next(error);
      }
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
        
    qnaWrite : async (req, res, next) => {
        let qnaParams = getQnaParams(req.body);
        let max = await Qna.max('qna_id');

        if(max==undefined) max=0;
        max += 1;
        qnaParams.user_id = res.locals.currentUser.user_id;
        qnaParams.qna_id = max;

        try {
            let qna = await Qna.create(qnaParams);   
            res.locals.q = qna;
            res.locals.redirect = "/mypage/qna";
            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }
    },


    showQnaWrite : (req, res) => {
        res.render("qna-write");
    },


    qnaView : async (req, res, next) => {
        let qnaId = req.params.qna_id;
        try {
            let qna = await Qna.findOne({
                where:{qna_id:qnaId}
            });
            res.locals.q = qna;
            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }
    },


    showQnaView : (req, res) => {
        res.render("qna-view");
    },

    qnaEdit : async (req, res, next) => {
        let qnaId = req.params.qna_id,
        userId = res.locals.currentUser
        qnaParams = getQnaParams(req.body);
        console.log(qnaParams);
        try {
            let qna = await Qna.findByPkAndUpdate({qnaId, userId}, qnaParams);
            res.locals.q = qna;
            res.locals.redirect = "/mypage/qna";
            next();

        } catch (error) {
            next(error);
        }
    },

    qnaEditView : async (req, res, next) => {
        let qnaId = req.params.qna_id;
        try {
            let qna = await Qna.findOne({
                where:{qna_id:qnaId}
            });
            res.locals.q = qna;
            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }
    },

    showQnaEdit : async (req, res) => {
        res.render("qna-edit");
    },

    qnaDelete : async (req, res, next) => {
        let qnaId = req.params.qna_id,
        userId = res.locals.user_id;
        try {
            let qna = await Qna.findByPkAndRemove({qnaId, userId});
            res.locals.q = qna;
            res.locals.redirect = "/mypage/qna";
            next();
        } catch (error) {
            next(error);
        }
    },
    

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