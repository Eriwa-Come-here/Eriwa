const user = require("./user");

module.exports = (sequelize, Sequelize) => {
  const qna = sequelize.define(
    "qna",
    {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: user,
          key: "user_id",
        },
      },
      qna_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      answer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return qna;
};
