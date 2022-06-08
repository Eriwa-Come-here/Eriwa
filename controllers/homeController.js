const db = require("../models/index"),
  User = db.user,
  Post = db.post,
  Qna = db.qna,
  Recommend = db.recommend;

module.exports={
    //function
    index : async (req, res, next) => {
        try {
            let posts = await Post.findAll();
            res.locals.posts = posts;
            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }
    },

    showIndex : (req, res) => {
        res.render("index")
    },

    showIndexPost : async (req,res,next) => {
        try {
            let postId = req.params.post_id;
            let post = await Post.findByKey(postId);
            res.locals.post = post;
            next();
        } catch (error) {
            next(error);
        };
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath!= undefined) res.redirect(redirectPath);
        else next();
    },

    board : async (req, res, next) => {
        try {
            let posts = await Post.findAll();
            res.locals.posts = posts;
            next();
        } catch (error) {
            console.log(`Error fetching: ${error.message}`);
            next(error);
        }
    },
    
    showBoard : (req, res) => {
        let paramsPlace = req.params.place;
        Post.findAll({
            where: {address1:paramsPlace}
        }).then( result =>{
            res.render("board"),{
                post: result
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    
    showDetailSearch : (req, res) => {
        res.render("detail-search");
    },
    
    //mypage
    qna : async (req, res, next) => {
        try {
            let qnas = await Qna.findAll();
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
    
    //service-intro
    showServiceIntro : (req, res) => {
        res.render("service-intro");
    }
};
