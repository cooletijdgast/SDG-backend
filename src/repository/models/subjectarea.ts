/**
 * @author Lars Brinker
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import { sequelize } from '../../util/sequelize/sequelize-database';

// order of InferAttributes & InferCreationAttributes is important.
export class SubjectArea extends Model<InferAttributes<SubjectArea>, InferCreationAttributes<SubjectArea>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
}

export function initSubjectArea(): void {
    SubjectArea.init(
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
                unique: true,
                type: DataTypes.STRING(250),
            },
            description: {
                allowNull: true,
                type: DataTypes.STRING,
            },
        },
        { sequelize, timestamps: false, tableName: 'SubjectArea' }
    );
}
