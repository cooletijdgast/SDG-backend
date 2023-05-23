/**
 * @author Lars Brinker
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';

// order of InferAttributes & InferCreationAttributes is important.
export class Achievement extends Model<InferAttributes<Achievement>, InferCreationAttributes<Achievement>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare title: string;
    declare image: string;
}

export function initAchievement() {
    Achievement.init(
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
            image: {
                allowNull: false,
                unique: false,
                type: DataTypes.STRING,
            },
        },
        { sequelize, tableName: 'Achievement' }
    );
}
