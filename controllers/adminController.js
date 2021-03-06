const db = require("../models/index"),
  Qna = db.qna,
  User = db.user,
  Post = db.post;
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
// const getAgefunc = require('../public/js/adminData.js');

module.exports = {
  
  checkPermission: async (req, res, next) => {
    try {
      if(res.locals.currentUser.user_id != process.env.ADMIN_ID)
      {
        req.flash("error", "접근권한이 없습니다.");
        res.redirect("/");
      }
      next();
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

    //회원관리
  showAdminMember: async (req, res, next) => {
    try {
      const [memberData, metadata] = await sequelize.query(
        "SELECT `user`.* , COUNT(`post`.`post_id`) AS `count` FROM `user` LEFT JOIN `post` ON `user`.`user_id`=`post`.`user_id` GROUP BY `user`.`user_id`",
        { type: Sequelize.SELECT }
      );
      console.log(memberData);
      res.locals.users = memberData;
      res.render("admin-member", { user: memberData });
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  memberDelete: async (req, res, next) => {
    let user_id = req.body.user_id;
    try {
      await sequelize.query("DELETE FROM `user` WHERE user_id = ?", {
        type: Sequelize.DELETE,
        replacements: [user_id],
      });
      res.redirect("/admin/member");
      next();
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  //게시물관리
  showAdminPost: async (req, res, next) => {
    try {
      const [postData, metadata] = await sequelize.query(
        "SELECT `post`.* , COUNT(`comment`.`post_id`) AS `commentCount` FROM `post` LEFT JOIN `comment` ON `post`.`post_id`=`comment`.`post_id` GROUP BY `post`.`post_id`",
        { type: Sequelize.SELECT }
      );
      console.log(postData);
      res.locals.posts = postData;
      res.render("admin-post", { post: postData });
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  postDelete: async (req, res, next) => {
    let post_id = req.body.post_id;
    try {
      await sequelize.query("DELETE FROM `post` WHERE post_id = ?", {
        type: Sequelize.DELETE,
        replacements: [post_id],
      });
      res.redirect("/admin/post");
      next();
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  //문의내역
  showAdminQna: async (req, res,next) => {
    try {
      const [qnaData, metadata]=await sequelize.query("SELECT `qna`.* ,`user`.`name` FROM `qna` LEFT JOIN `user` ON `qna`.`user_id`=`user`.`user_id`",
      { type: Sequelize.SELECT }
    );
      res.locals.qnas=qnaData;
      console.log(qnaData);
      res.render("admin-qna",{qna:qnaData});
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  //문의글답변
  showAdminQnaResponse: async(req, res,next) => {
    try {
      const [qnaData, metadata]=await sequelize.query("SELECT `qna`.* ,`user`.`name` FROM `qna` LEFT JOIN `user` ON `qna`.`user_id`=`user`.`user_id` WHERE qna_id=?",
      {
        type: Sequelize.SELECT,
        replacements :[req.params.qna_id]
      }
    );
      console.log(qnaData);
      res.render("admin-qna-response",{qna:qnaData[0]});
    } catch (error) {
      console.log(`Error fetching User by ID: ${error.message}`);
      next(error);
    }
  },

  qnaResponse: async (req, res, next) => {
    try {
      await sequelize.query(
        "UPDATE `qna` SET `answer`=? WHERE qna_id=?",
        {
          type: sequelize.QueryTypes.UPDATE,
          replacements: [req.body.answer , req.params.qna_id]
        }
      );
      res.redirect("/admin/qna");
    } catch (error) {
      console.log(`Error fetching Post by ID: ${error.message}`);
      next(error);
    }
  }

}