module.exports = (sequelize, Sequelize) => {
    const user = require("./user")(sequelize, Sequelize);
    class event extends Sequelize.Model {
      static async findByPkAndUpdate(id, params) {
        try {
          let event = await event.findByPk(id);
          if (event) {
            event = await event.update(params, {
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
          let event = await event.findByPk(id);
          if (event) {
            event = await event.destroy(params, {
              where: { id: id },
            });
          }
          return event;
        } catch (err) {
          console.log(err);
        }
      }
    }
    event.init(
      {
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: user,
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
        modelName: "event",
        tableName: "event",
      }
    );
    return event;
  };
  