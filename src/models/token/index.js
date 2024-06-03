import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const tokenModel = sequelize.define(
    'Token',
    {
        token: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    },
    {}
);

export default tokenModel;