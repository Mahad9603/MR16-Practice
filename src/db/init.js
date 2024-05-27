import sequelize from "./config.js"


const syncDB = async () => {
    await sequelize.sync({alter: true})
}

export default syncDB;