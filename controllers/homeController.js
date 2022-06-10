const db = require("../models/index"),
  Post = db.post,
  Recommend = db.recommend,
  Comment = db.comment,
  getBoardParams = body => {
      return {
          place_address: body.address
      };
  };

module.exports={
    //function
    index : async (req, res, next) => {
        try {
            let max = await Post.max('view_count');
            let post = await Post.findOne({
                where: { view_count: max }
            });
            let posts = await Post.findAll({/*
                include : [{
                    model: Comment,
                    required: true
                }]*/
            });

            res.locals.post = post;
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
        res.locals.p = req.params.place_name;

        try{
            res.render("board"),{
                place_name: params.place_address
            }
        }
        catch(err){
            console.log(err);
        }
    },

    showBoardBase : (req, res) => {
        res.render("board");
    },
    
    showDetailSearch : (req, res) => {
        res.render("detail-search");
    },
    
    //service-intro
    showServiceIntro : (req, res) => {
        res.render("service-intro");
    }
};
