/**
 * @author Lars Brinker
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';
import { User } from './user';

enum CommentTypes {
    CONTENT = 'CONTENT',
    COMMENT = 'COMMENT',
}

// order of InferAttributes & InferCreationAttributes is important.
export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare userID: ForeignKey<User['id']>;
    declare text: string;
    declare parentID: number;
    declare commentType: CommentTypes;
}

export function initComment() {
    Comment.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            text: {
                allowNull: false,
                type: DataTypes.STRING(5000),
            },
            parentID: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            commentType: {
                allowNull: false,
                type: DataTypes.ENUM(...Object.values(CommentTypes)),
            },
        },
        { sequelize, tableName: 'Comment' }
    );
}
