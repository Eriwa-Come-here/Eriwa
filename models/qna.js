module.exports = (sequelize, Sequelize) => {
  const User = require("./user")(sequelize, Sequelize);
  class Qna extends Sequelize.Model {}
  Qna.init(
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: User,
          key: "user_id",
        },
      },
      qna_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoincrement: true,
        primarykey: true,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      answer: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Qna",
      tableName: "qna",
    }
  );
  Qna.removeAttribute("id");
  return Qna;
};
