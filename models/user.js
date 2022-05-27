module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        id:{
            type: Sequelize.STRING, 
            primaryKey: true
        },
        password:{
            type: Sequelize.STRING
        },
        name:{
            type: Sequelize.STRING

        },
        nickname:{
            type: Sequelize.STRING

        },
        email:{
            type: Sequelize.STRING
            
        },
        birthdate:{
            type: Sequelize.DATE
        },
        gender:{
            type: Sequelize.STRING(1)
        }
    });
}