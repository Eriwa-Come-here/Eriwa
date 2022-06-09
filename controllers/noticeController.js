const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
const datefunc = require('../public/js/datefunc.js');


module.exports = {
    showNotice: async (req, res, next) => {
        try {
            const [result, metadata] = await sequelize.query("SELECT * FROM `event` WHERE user_id = ? ORDER BY event_date DESC", {
                type: Sequelize.SELECT,
                replacements: [res.locals.currentUser.dataValues.user_id]
            });
            console.log(result[0].is_checked);
            res.render("notice", {events: result, getDate: datefunc.getDate});
        } catch (err) {
            console.log(`Error from checking notice: ${err.message}`);
            next(err);
        }
    },

    checkNotice: async (req, res, next) => {
        try {
            await sequelize.query("UPDATE `comment` SET `comment` = ? WHERE `post_id` = ? AND `comment_id` = ?;", {
                type: sequelize.QueryTypes.UPDATE,
                replacements: [req.body.comment_content, req.params.post_id, req.body.comment_id]
            });
            console.log(req.body.url);
            res.redirect("/board/post-view/" + req.params.post_id);
        } catch (err) {
            console.log(`Error from checking notice: ${err.message}`);
            next(err);
        }     
    }
};
