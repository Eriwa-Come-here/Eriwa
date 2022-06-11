const db = require("../models/index"),
  Post = db.post,
  Recommend = db.recommend,
  Comment = db.comment,
  getBoardParams = body => {
      return {
          place_address: body.address
      };
  };
const Sequelize = require("sequelize");
const sequelize = db.sequelize;

module.exports={
    //function
    index : async (req, res, next) => {
        try {
            let max = await Post.max('view_count');
            let query1 = "SELECT `post`.*, COUNT(`recommend`.`user_id`) AS `recommend_count` FROM `post` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            let query2 = "SELECT `post`.*, COUNT(`comment`.`post_id`) AS `comment_count` FROM `post` LEFT JOIN `comment` ON `post`.`post_id` = `comment`.`post_id` GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            let query3 = "SELECT `post`.*, COUNT(`comment`.`post_id`) AS `comment_count`, COUNT(`recommend`.`user_id`) AS `recommend_count` FROM `post` LEFT JOIN `comment` ON `post`.`post_id` = `comment`.`post_id` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` WHERE `post`.`view_count` = (SELECT MAX(`view_count`) FROM `post` GROUP BY `post`.`post_id` LIMIT 1) GROUP BY `post`.`post_id` LIMIT 1";

            const posts = await sequelize.query(query1, {
                type: Sequelize.SELECT
            });

            const comment = await sequelize.query(query2, {
                type: Sequelize.SELECT
            });

            const post = await sequelize.query(query3, {
                type: Sequelize.SELECT
            });

            res.locals.post = post;
            res.locals.posts = posts;
            res.locals.comment = comment;
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
            let query1 = "SELECT `post`.*, COUNT(`recommend`.`user_id`) AS `recommend_count` FROM `post` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            let query2 = "SELECT `post`.*, COUNT(`comment`.`post_id`) AS `comment_count` FROM `post` LEFT JOIN `comment` ON `post`.`post_id` = `comment`.`post_id` GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            
            const posts = await sequelize.query(query1, {
                type: Sequelize.SELECT
            });

            const comment = await sequelize.query(query2, {
                type: Sequelize.SELECT
            });
            
            res.locals.comment = comment;
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
