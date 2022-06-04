module.exports = (sequelize, Sequelize) => {
  const User = require("./user")(sequelize, Sequelize);
  class Event extends Sequelize.Model {
    static async findByPkAndUpdate(id, params) {
      try {
        let event = await Event.findByPk(id);
        if (event) {
          event = await Event.update(params, {
            where: { id: id },
          });
        }
        return event;
      } catch (err) {
        console.log(err);
      }
    }
    static async findByPkAndRemove(id) {
      try {
        let event = await Event.findByPk(id);
        if (event) {
          event = await Event.destroy(params, {
            where: { id: id },
          });
        }
        return event;
      } catch (err) {
        console.log(err);
      }
    }
  }
  Event.init(
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: User,
          key: "user_id",
        },
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoincrement: true,
        primarykey: true,
      },
      event_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Event",
      tableName: "event",
    }
  );
  return Event;
};
