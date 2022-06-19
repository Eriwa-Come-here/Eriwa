module.exports = (sequelize, Sequelize) => {
    const User = require("./user")(sequelize, Sequelize);
    class Note extends Sequelize.Model {}
    Note.init(
      {
        note_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoincrement: true,
          primarykey: true,
        },
        receive_user_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: User,
            key: "user_id",
          },
        },
        send_user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: User,
              key: "user_id",
            },
          },
        note_content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        written_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Note",
        tableName: "note",
      }
    );
    return Note;
  };
  