const db = require("../models/index"),
    User = db.user,
    Post = db.post,
    Qna = db.qna,
    Recommend = db.recommend,
    getPostParams = body => {
        return{
            title: body.title
        };
    };

module.exports={
    //function
    index : async (req, res, next) => {
        try {
            let post = await Post.findAll();
            res.locals.post = post;
            next();
        } catch (error) {
            next(error);
        }
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

    showIndex : (req, res) => {
        Post.findAll({

        }).then( result =>{
            res.render("index"),{
                post: result
            }
        }).catch(function(err){
            console.log(err);
        });
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
    showQna : (req, res) => {
        res.render("mypage-qna");
    },
    
    showRecommend : (req, res) => {
        res.render("mypage-recommend");
    },
    
    
    //notice
    showNotice : (req, res) => {
        res.render("notice");
    },
    
    //service-intro
    showServiceIntro : (req, res) => {
        res.render("service-intro");
    }

};

