/**
 * @author Casper Driessen
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';
import { User } from './user';

// order of InferAttributes & InferCreationAttributes is important.
export class Follow extends Model<InferAttributes<Follow>, InferCreationAttributes<Follow>> {
    // when creating an instance of the model (such as using Model.create()).
    declare userID: ForeignKey<User['id']>;
    declare followsUserID: ForeignKey<User['id']>;
}

export function initFollow() {
    Follow.init(
        {
            userID: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            followsUserID: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
        },
        { sequelize, tableName: 'Follow' }
    );
}
