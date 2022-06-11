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
    }

module.exports={
    mypageGood : (req, res) => {
        res.render("mypage-good-list");
    },

    mypageReply : (req, res) => {
        res.render("mypage-reply-list");
    },

    mypageWrite : (req, res) => {
        res.render("mypage-write-list");
    },


    chatList : (req, res) => {
        res.render("chat-list");
    },

    chatStory : (req, res) => {
        res.render("chat");
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