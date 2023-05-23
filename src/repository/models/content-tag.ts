import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';
import { Upload } from './upload';
import { SDG } from './sdg';

enum TagTypes {
    SDG = 'SDG',
    SUBJECT_AREA = 'SUBJECT_AREA',
}

// order of InferAttributes & InferCreationAttributes is important.
export class ContentTag extends Model<InferAttributes<ContentTag>, InferCreationAttributes<ContentTag>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare tagID: string;
    declare tagType: string;
}

export function initContentTag() {
    ContentTag.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            tagID: {
                allowNull: false,
                unique: false,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            tagType: {
                allowNull: false,
                type: DataTypes.ENUM(...Object.values(TagTypes)),
            },
        },
        { sequelize, timestamps: false }
    );
}
