/**
 * @author Lars Brinker
 */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import * as express from 'express';
import { sequelize } from '../../util/sequelize/sequelize-database';

// order of InferAttributes & InferCreationAttributes is important.
export class Contact extends Model<InferAttributes<Contact>, InferCreationAttributes<Contact>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare name: string;
    declare title: string;
    declare email: string;
    declare message: string;
}

export class ContactCheck {
    private innerContact: Contact;

    constructor(request: express.Request) {
        this.innerContact = request.body as Contact;
    }
    /**
     * Checks if a string's length is in the given range.
     * @author Vincent Obahiagbon
     * @param string - The checked string
     * @param range - The min and max allowed length of the given string.
     * @returns Whether the string's length is included in the given range.
     */
    private checkStringRange(string: string, range: [number, number]): boolean {
        const [min, max] = range;
        return string.length >= min && string.length <= max;
    }

    /**
     * Validates the inner user based on the requirements in issue #3.
     * @author Vincent Obahiagbon
     * @returns Whether the user is valid or not
     */
    private validateContact(): boolean {
        const { name, title, email, message } = this.innerContact;
        const validationList: boolean[] = [];
        validationList.push(this.checkStringRange(name, [2, 64]));
        validationList.push(this.checkStringRange(title, [2, 64]));
        validationList.push(email.includes('@') && email.includes('.'));
        validationList.push(this.checkStringRange(message, [2, 1000]));
        return validationList.find((validateResult) => !validateResult) === undefined;
    }

    /**
     * Calls the private validate function and only returns the user if the user is valid.
     * @author Vincent Obahiagbon
     * @returns A User if the inner user is valid, null if the validation.
     */
    public getContact(): Contact | null {
        return this.validateContact() ? this.innerContact : null;
    }
}

export function initContact(): void {
    Contact.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING(450),
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            message: {
                allowNull: false,
                type: DataTypes.STRING(1000),
            },
        },
        { sequelize, timestamps: false, tableName: 'Contact' }
    );
}
