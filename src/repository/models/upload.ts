/**
 * @author Lars Brinker, Youri Janssen
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';
import { User } from './user';

// order of InferAttributes & InferCreationAttributes is important.
export class Upload extends Model<InferAttributes<Upload>, InferCreationAttributes<Upload>> {
    declare id: CreationOptional<number>;
    declare userID: ForeignKey<User['id']>;
    declare title: string;
    declare text: string;
    declare media: string;
    declare sdg: string;
    declare subject: string;
}

export function initUpload() {
    Upload.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            userID: {
                allowNull: true,
                unique: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            title: {
                allowNull: false,
                unique: false,
                type: DataTypes.STRING(250),
            },
            text: {
                allowNull: false,
                type: DataTypes.STRING(2500),
            },
            media: {
                allowNull: true,
                type: DataTypes.STRING(200),
            },
            sdg: {
                allowNull: false,
                type: DataTypes.STRING(200),
            },
            subject: {
                allowNull: false,
                type: DataTypes.STRING(200),
            },
        },
        { sequelize, tableName: 'Content' }
    );
}
