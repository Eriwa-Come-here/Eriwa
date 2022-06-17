const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
const datefunc = require('../public/js/datefunc.js');


module.exports = {
    // 알림함을 불러옴
    showNotice: async (req, res, next) => {
        try {
            const [result, metadata] = await sequelize.query("SELECT * FROM `event` WHERE `user_id` = ? AND `event_date` > DATE_ADD(now(), INTERVAL -30 DAY) ORDER BY `event_date` DESC", {
                type: Sequelize.SELECT,
                replacements: [res.locals.currentUser.dataValues.user_id]
            });
            res.render("notice", {events: result, getDate: datefunc.getDate});
        } catch (err) {
            console.log(`Error from notice: ${err.message}`);
            next(err);
        }
    },

    // 알림의 읽음처리
    checkNotice: async (req, res, next) => {
        try {
            if (req.body.is_checked == 0) {
                await sequelize.query("UPDATE `event` SET `is_checked` = 1 WHERE `user_id` = ? AND `event_id` = ?", {
                    type: sequelize.QueryTypes.UPDATE,
                    replacements: [req.body.user_id, req.body.event_id]
                });
            }
            res.redirect(req.body.event_url);
        } catch (err) {
            console.log(`Error from notice: ${err.message}`);
            next(err);
        }     
    },

    // 30일 지난 알림의 삭제
    deleteNotice: async () => {
        try {
            await sequelize.query("DELETE FROM `event` WHERE `event_date` < DATE_ADD(now(), INTERVAL -30 DAY)", {
                type: sequelize.QueryTypes.DELETE
            });
            console.log("30일 지난 알림을 삭제하였습니다")
        } catch (err) {
            console.log(err);
        }
    }
};
