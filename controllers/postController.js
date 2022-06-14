const multer = require("multer");
const path = require("path");
const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const datefunc = require("../public/js/datefunc.js");

module.exports = {
  // show
  showPost: async (req, res, next) => {
    try {
      const [post, post_metadata] = await sequelize.query(
        "SELECT `p`.* , `u`.`nickname`, COUNT(`r`.`user_id`) AS `recommend_count` FROM `post` AS `p` LEFT JOIN `user` AS `u` ON `u`.`user_id` = `p`.`user_id` LEFT JOIN `recommend` AS `r` ON `p`.`post_id` = `r`.`post_id` GROUP BY `p`.`post_id` HAVING `p`.`post_id` = ?",
        {
          type: Sequelize.SELECT,
          replacements: [req.params.post_id],
        }
      );
      if (post[0]) { // 불러온 게시글이 있는 경우
        const [comments, comment_metadata] = await sequelize.query( // 해당 글의 댓글을 가져옴
          "SELECT `c`.*, `u`.`nickname` FROM `comment` AS `c` LEFT JOIN `user` AS `u` ON `u`.`user_id` = `c`.`user_id` WHERE `post_id` = ?",
          {
            type: Sequelize.SELECT,
            replacements: [req.params.post_id],
          }
        );
        const [recommend, recommend_metadata] = await sequelize.query( // 유저가 추천을 눌렀는지 여부
          "SELECT * FROM `recommend` WHERE `post_id` = ? AND `user_id` = ?",
          {
            type: Sequelize.SELECT,
            replacements: [req.params.post_id, res.locals.currentUser.dataValues.user_id],
          }
        );
        let is_pushed;
        if(recommend[0]) {
          is_pushed = 1; // 추천을 이미 눌렀으면 is_pushed는 1
        } else {
          is_pushed = 0; // 추천을 누르지 않았으면 is_pushed는 0
        }
        await sequelize.query( // 조회수를 증가시킴
          "UPDATE `post` SET `view_count` = `view_count` + 1 WHERE `post_id` = ?",
          {
            type: sequelize.QueryTypes.UPDATE,
            replacements: [req.params.post_id],
          }
        );
        res.render("post-view", {
          post: post[0],
          comments: comments,
          is_pushed: is_pushed,
          getDate: datefunc.getDate,
        });
      } else { // 해당하는 게시글이 없는 경우
        next();
      }
    } catch (err) {
      console.log(`Error fetching Post by ID: ${err.message}`);
      next(err);
    }
  },

  // 게시글 추천
  pushRecommend: async (req, res, next) => {
    try {
      await sequelize.query(
        "INSERT INTO `recommend`(`post_id`, `user_id`) VALUES (?, ?)",
        {
          type: sequelize.QueryTypes.INSERT,
          replacements: [
            req.params.post_id,
            req.body.user_id,
          ],
        }
      );
      res.redirect("/board/post-view/" + req.params.post_id);
    } catch (err) {
      console.log(`${err.message}`);
      next(err);
    }
  },

  showPostWriting: (req, res) => {
    res.render("post-writing");
  },
  
  showPostEdit: async(req, res,next) => {
    try {
      const [postData, metadata]=await sequelize.query("SELECT `post`.* FROM `post` WHERE post_id=?",
      {
        type: Sequelize.SELECT,
        replacements :[req.params.post_id]
      }
    );
      console.log(postData);
      res.render("post-edit",{post:postData[0]});
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },
  
  createPost: async (req, res, next) => {
    try {
      await sequelize.query(
        "INSERT INTO `post`(`title`,`content`,`address1`,`address2`,`address3`,`place_name`,`place_type`,`image`,`grade`,`written_date`,`user_id`,`can_park`,`can_pet`,`view_count`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        {
          type: sequelize.QueryTypes.INSERT,
          replacements: [
            req.body.title,
            req.body.content,
            req.body.address1,
            req.body.address2,
            req.body.address3,
            req.body.place_name,
            req.body.place_type,
            req.file.filename,
            req.body.grade,
            new Date(),
            req.body.post_author,
            req.body.can_park,
            req.body.can_pet,
            "0",
          ],
        }
      );
      res.redirect("/");
    } catch (error) {
      console.log(`Error fetching Post by ID: ${error.message}`);
      next(error);
    }
  },
  
  editPost: async (req, res, next) => {
    try {
      if(req.file==undefined){
      await sequelize.query("UPDATE `post` SET `title`=?,`content`=?,`address1`=?,`address2`=?,`address3`=?,`place_name`=?,`place_type`=?,`grade`=?,`can_park`=?,`can_pet`=? WHERE `post_id` = ?;", {
        type: sequelize.QueryTypes.UPDATE,
        replacements: [req.body.title, req.body.content, req.body.address1, req.body.address2, req.body.address3,
          req.body.place_name, req.body.place_type, req.body.grade, req.body.can_park,
          req.body.can_pet,req.params.post_id]
      });
    }else{
          await sequelize.query("UPDATE `post` SET `title`=?,`content`=?,`address1`=?,`address2`=?,`address3`=?,`place_name`=?,`place_type`=?,`image`=?,`grade`=?,`can_park`=?,`can_pet`=? WHERE `post_id` = ?;", {
        type: sequelize.QueryTypes.UPDATE,
        replacements: [req.body.title, req.body.content, req.body.address1, req.body.address2, req.body.address3,
          req.body.place_name, req.body.place_type, req.file.filename, req.body.grade, req.body.can_park,
          req.body.can_pet,req.params.post_id]
      });
    }
      res.redirect("/board/post-view/" + req.params.post_id);
    } catch (err) {
      console.log(`${err.message}`);
      next(err);
    }
  },
  
  deletePost: async (req, res, next) => {
    let post_id = req.params.post_id;
    try {
      await sequelize.query("DELETE FROM `post` WHERE post_id = ?", {
        type: Sequelize.DELETE,
        replacements: [post_id],
      });
      res.redirect("/");
      next();
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  }
};

