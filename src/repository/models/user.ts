/**
 * @author Lars Brinker
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { Roles } from '../../business/user';
import { sequelize } from '../../util/sequelize/sequelize-database';
import { SubjectArea } from './subjectarea';

// order of InferAttributes & InferCreationAttributes is important.
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare email: string;
    declare username: CreationOptional<string>;
    declare password: string;
    declare firstName: CreationOptional<string>;
    declare lastName: CreationOptional<string>;
    declare preposition: CreationOptional<string>;
    declare profilePicture: CreationOptional<string>;
    declare level: CreationOptional<number>;
    declare levelProgress: CreationOptional<number>;
    declare subjectAreaID: ForeignKey<SubjectArea['id']>;
    declare role: CreationOptional<Roles>;
}

export function initUser() {
    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            username: {
                allowNull: true,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            firstName: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            lastName: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            preposition: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            profilePicture: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            level: {
                allowNull: false,
                defaultValue: 1,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            levelProgress: {
                allowNull: false,
                defaultValue: 0,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            role: {
                allowNull: false,
                type: DataTypes.ENUM(...Object.values(Roles)),
                defaultValue: Roles.STUDENT,
            },
        },
        { sequelize, tableName: 'User' }
    );
}
