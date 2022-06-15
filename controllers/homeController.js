const db = require("../models/index"),
  Post = db.post,
  getSearchParams = body => {
      return {
        written_date: body.written_date,
        title: body.range,
        content: body.range,
        nickname: body.range,
        address1: body.address1,
        place_type: body.place_type,
        grade: body.grade,
        can_park: body.etc,
        can_pet: body.etc,
        search_content: body.search_content
      };
  };
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const search = require("../public/js/search.js");
const currentDate = require("../public/js/currentDate.js");

module.exports={
    //function
    index : async (req, res, next) => {
        try {
            let max = await Post.max('view_count');
            let query1 = "SELECT `user`.*, `post`.*, COUNT(`recommend`.`user_id`) AS `recommend_count` FROM `post` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            let query2 = "SELECT `post`.*, COUNT(`comment`.`post_id`) AS `comment_count` FROM `post` LEFT JOIN `comment` ON `post`.`post_id` = `comment`.`post_id` GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            let query3 = "SELECT `user`.*, `post`.*, COUNT(`comment`.`post_id`) AS `comment_count` FROM `post` LEFT JOIN `comment` ON `post`.`post_id` = `comment`.`post_id` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id` WHERE `post`.`view_count` = (SELECT MAX(`view_count`) FROM `post` GROUP BY `post`.`post_id` LIMIT 1) GROUP BY `post`.`post_id` LIMIT 1";
            let query4 = "SELECT `user`.*, `post`.*, COUNT(`recommend`.`post_id`) AS `recommend_count` FROM `post` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` WHERE `post`.`view_count` = (SELECT MAX(`view_count`) FROM `post` GROUP BY `post`.`post_id` LIMIT 1) GROUP BY `post`.`post_id` LIMIT 1";

            const posts = await sequelize.query(query1, {
                type: Sequelize.SELECT
            });

            const comment = await sequelize.query(query2, {
                type: Sequelize.SELECT
            });

            const post = await sequelize.query(query3, {
                type: Sequelize.SELECT
            });

            const rec = await sequelize.query(query4,{
                type: Sequelize.SELECT
            });

            res.locals.post = post;
            res.locals.posts = posts;
            res.locals.comment = comment;
            res.locals.rec = rec;
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
            res.locals.place_name = "all";
            let query1 = "SELECT `user`.*, `post`.*, COUNT(`recommend`.`user_id`) AS `recommend_count` FROM `post` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
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

    boardPlace : async (req, res, next) => {
        try {
            let place = req.params.place_name;
            let query1 = "SELECT `user`.*, `post`.*, COUNT(`recommend`.`user_id`) AS `recommend_count` FROM `post` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id` LEFT JOIN `recommend` ON `post`.`post_id` = `recommend`.`post_id` WHERE `post`.`address1` = ? GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            let query2 = "SELECT `post`.*, COUNT(`comment`.`post_id`) AS `comment_count` FROM `post` LEFT JOIN `comment` ON `post`.`post_id` = `comment`.`post_id` WHERE `post`.`address1` = ? GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";

            const posts = await sequelize.query(query1, {
                type: Sequelize.SELECT,
                replacements: [place]
            });

            const comment = await sequelize.query(query2, {
                type: Sequelize.SELECT,
                replacements: [place]
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
        try{        
            res.locals.place_name = req.params.place_name;
            res.render("board");
        }
        catch(err){
            console.log(err);
        }
    },

    detailSearch: async (req, res, next) => {
        let searchParams = getSearchParams(req.body);

        for(let key in searchParams){
            if(searchParams[key] == undefined){ 
                delete searchParams[key];
            }
        }

        if(searchParams.written_date=="all") delete searchParams.written_date;
        if(searchParams.address1=="all") delete searchParams.address1;
        if(searchParams.place_type=="all") delete searchParams.place_type;
        if(searchParams.grade=="all") delete searchParams.grade;
        if(searchParams.search_content=="") {
            delete searchParams.search_content;
            delete searchParams.content;
            delete searchParams.nickname;
            delete searchParams.title;}

        if(searchParams.can_park == "null") {delete searchParams.can_park; delete searchParams.can_pet;}
        if(searchParams.can_park == "park") {delete searchParams.can_pet; searchParams.can_park=1;}
        if(searchParams.can_pet == "pet") {delete searchParams.can_park; searchParams.can_pet=1;}

        switch (req.body.range) {
            case "title":
                delete searchParams.content;
                delete searchParams.nickname;
                break;

            case "content":
                delete searchParams.title;
                delete searchParams.nickname;
                break;

            case "nickname":
                delete searchParams.title;
                delete searchParams.content;
        
            default:
                break;
        }

        try { 
            let query1 = "SELECT `post`.*, `user`.`nickname` FROM `post` LEFT JOIN `user` ON `user`.`user_id` = `post`.`user_id`"; 
            let query2 = " GROUP BY `post`.`post_id` ORDER BY `written_date` DESC";
            let count = 0;

            for(let key in searchParams){
                if(count==0){
                    if(key == "title" || key=="content")
                        query1 += " WHERE `post`.`"+key+"` LIKE '%"+searchParams.search_content+"%'";
                    else if(key=="nickname")
                        query1 += " WHERE `user`.`"+key+"` LIKE '%"+searchParams.search_content+"%'";
                    else if(key=="written_date") 
                        query1 += " WHERE DATE(`post`.`written_date`) between '"+search.sliceDate(searchParams.written_date)+"' AND '"+currentDate.currentDate()+"'";
                    else if(key=="grade")
                        query1 += " WHERE `post`.`"+key+"`>='"+searchParams[key]+"'";
                    else
                        query1 += " WHERE `post`.`"+key+"`='"+searchParams[key]+"'";}

                else if(key == "title" || key=="nickname" || key=="content")
                    query1 += " AND `post`.`"+key+"`LIKE '%"+searchParams.search_content+"%'";
                else if(key=="nickname")
                    query1 += " AND `user`.`"+key+"` LIKE '%"+searchParams.search_content+"%'";
                else if(key=="search_content")
                    continue;
                else if(key=="written_date") 
                    query1 += " AND DATE(`post`.`written_date`) between '"+search.sliceDate(searchParams.written_date)+"' AND '"+currentDate.currentDate()+"'";
                else if(key=="grade")
                    query1 += " AND `post`.`"+key+"`>='"+searchParams[key]+"'";
                else
                    query1 += " AND `post`.`"+key+"`='"+searchParams[key]+"'";
                count++;
                }
                
            if(count==0){
                const posts = await sequelize.query(query1+query2, {
                    type: Sequelize.SELECT
                });
                res.locals.posts = posts;
            }
            else{
                const posts = await sequelize.query(query1+query2, {
                    type: Sequelize.SELECT
                });
                res.locals.posts = posts;
            }
            next();

        } catch (error) {
            next(error);
        }
    },
    
    showDetailSearch : (req, res) => {
        res.render("detail-search", {
          getDate: search.getDate
        });
    },
    
    //service-intro
    showServiceIntro : (req, res) => {
        res.render("service-intro");
    },

    showServiceIntroDetail : (req, res) => {
        res.render("service-intro-post");
    }
};
