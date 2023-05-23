/**
 * @author Lars Brinker
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';

// order of InferAttributes & InferCreationAttributes is important.
export class SDG extends Model<InferAttributes<SDG>, InferCreationAttributes<SDG>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare title: string;
    declare text: string;
    declare picture: string;
}

export function initSDG() {
    SDG.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            title: {
                allowNull: false,
                unique: false,
                type: DataTypes.STRING,
            },
            text: {
                allowNull: false,
                type: DataTypes.STRING(5000),
            },
            picture: {
                allowNull: false,
                type: DataTypes.STRING(1000),
            },
        },
        { sequelize, tableName: 'SDG' }
    );
}
