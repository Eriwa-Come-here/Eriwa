module.exports = (sequelize, Sequelize) => {
  const User = require("./user")(sequelize, Sequelize);
  class Event extends Sequelize.Model {}
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
