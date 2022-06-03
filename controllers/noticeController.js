const db = require('../models');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;


module.exports = {
    showNotice: (req, res, next) => {
        res.render("notice");
    },

    showNotice: async (req, res) => {
        try {
            const [result, metadata] = await sequelize.query("SELECT * FROM `event` WHERE user_id = ?", {
                type: Sequelize.SELECT,
                replacements: ['aeaf']
            });
            console.log(result);
            res.render("notice", {events: result});
        } catch (err) {
            res.status(500).send({
            message: err.message,
            });
        }
    },
    
};
  