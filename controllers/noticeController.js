const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
const datefunc = require('../public/js/datefunc.js');


module.exports = {
    showNotice: (req, res, next) => {
        res.render("notice");
    },

    showNotice: async (req, res) => {
        try {
            const [result, metadata] = await sequelize.query("SELECT * FROM `event` WHERE user_id = ? ORDER BY event_date DESC", {
                type: Sequelize.SELECT,
                replacements: ['aeaf']
            });
            console.log(result);
            res.render("notice", {events: result, getDate: datefunc.getDate});
        } catch (err) {
            res.status(500).send({
            message: err.message,
            });
        }
    },
    
};
  