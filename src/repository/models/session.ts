/**
 * @author Lars Brinker
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';
import { User } from './user';

// // order of InferAttributes & InferCreationAttributes is important.
export class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare sessionID: CreationOptional<string>;
    declare userID: ForeignKey<User['id']>;
    declare expirationDate: Date;
}

export function initSession(): void {
    Session.init(
        {
            sessionID: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            expirationDate: {
                type: DataTypes.DATE,
            },
        },
        { sequelize, tableName: 'Session' }
    );
}
