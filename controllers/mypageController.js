const passport = require("passport");

const db = require("../models/index"), 
    Qna = db.qna,
    Recommend = db.recommend,
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
            question:body.question
        }
    },
    getQnaSearchParams = body => {
        return{
            answer:body.answer
        }
    };
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const datefunc = require('../public/js/datefunc.js');
const search = require("../public/js/search.js");
const currentDate = require("../public/js/currentDate.js");

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
        res.locals.place_name = req.params.place_name;
        res.render("mypage-recommend");
    },

    recommend: async (req, res, next) => {
        try {
            res.locals.place_name = "all";
            let query1 = "SELECT `post`.*, COUNT(`recommend`.`user_id` ) AS `recommend_count` FROM `recommend` LEFT JOIN `post` ON `recommend`.`post_id` = `post`.`post_id` WHERE `recommend`.`user_id`=? GROUP BY `recommend`.`user_id`, `recommend`.`post_id` ORDER BY `written_date` DESC";
            let query2 = "SELECT `recommend`.*, COUNT(`comment`.`user_id`) AS `comment_count` FROM `recommend` LEFT JOIN `comment` ON `recommend`.`post_id` = `comment`.`post_id` LEFT JOIN `post` ON `recommend`.`post_id` = `post`.`post_id` WHERE `recommend`.`user_id`='sungshin2' GROUP BY `recommend`.`user_id`, `recommend`.`post_id` ORDER BY `post`.`written_date` DESC";
            
            const posts = await sequelize.query(query1, {
                type: Sequelize.SELECT,
                replacements: [res.locals.currentUser.user_id]
            });

            const comment = await sequelize.query(query2, {
                type: Sequelize.SELECT,
                replacements: [res.locals.currentUser.user_id]
            });
        
            let recommends = await Recommend.findAll({
            });
            
            res.locals.comment = comment;
            res.locals.recommends = recommends;
            res.locals.posts = posts;

            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }

    },

    recommendPlace: async (req, res, next) => {
        try {
            let place = req.params.place_name;
            let query1 = "SELECT `post`.*, COUNT(`recommend`.`user_id` ) AS `recommend_count` FROM `recommend` LEFT JOIN `post` ON `recommend`.`post_id` = `post`.`post_id` WHERE `recommend`.`user_id`=? AND `post`.`address1` = ? GROUP BY `recommend`.`user_id`, `recommend`.`post_id` ORDER BY `written_date` DESC";
            let query2 = "SELECT `recommend`.*, COUNT(`comment`.`user_id`) AS `comment_count` FROM `recommend` LEFT JOIN `comment` ON `recommend`.`post_id` = `comment`.`post_id` LEFT JOIN `post` ON `recommend`.`post_id` = `post`.`post_id` WHERE `recommend`.`user_id`=? AND `post`.`address1` = ? GROUP BY `recommend`.`user_id`, `recommend`.`post_id` ORDER BY `post`.`written_date` DESC";
           
            const posts = await sequelize.query(query1, {
                type: Sequelize.SELECT,
                replacements: [res.locals.currentUser.user_id, place]
            });

            const comment = await sequelize.query(query2, {
                type: Sequelize.SELECT,
                replacements: [res.locals.currentUser.user_id, place]
            });
        
            let recommends = await Recommend.findAll({
            });
            
            res.locals.comment = comment;
            res.locals.recommends = recommends;
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

    qnaSearch : async (req, res, next) => {
        let qnaSearchParams = getQnaSearchParams(req.body);
        console.log(qnaSearchParams);

        for(let key in qnaSearchParams){
            if(qnaSearchParams[key] == undefined){ 
                delete qnaSearchParams[key];
            }
        }

        if(qnaSearchParams.answer=="all") delete qnaSearchParams.answer;
        console.log(qnaSearchParams);

        try {
            let query1 = "SELECT `qna`.* FROM `qna` WHERE `qna`.`user_id`=?"; 
            let query2 = " ORDER BY `qna`.`qna_id`";

            for(let key in qnaSearchParams){
                if(key=="answer")
                    query1 += " AND `qna`.`"+key+"` is "+qnaSearchParams[key];}

            const qnas = await sequelize.query(query1+query2, {
                type: Sequelize.SELECT,
                replacements:[res.locals.currentUser.user_id]
            });
            res.locals.qnas = qnas;
            next();

        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }
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
        qnaParams = getQnaParams(req.body);
        try {
            let qna = await sequelize.query("UPDATE `qna` SET `question`=?  WHERE `qna_id` = ?", {
                type: sequelize.QueryTypes.UPDATE,
                replacements: [qnaParams.question, qnaId]
            });
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
        let qnaId = req.params.qna_id;
        try {
            await sequelize.query("DELETE FROM `qna` WHERE qna_id = ?", {
                type: Sequelize.DELETE,
                replacements: [qnaId]
            });
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