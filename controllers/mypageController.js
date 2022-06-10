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