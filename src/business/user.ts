/**
 * @author Lars Brinker
 */
import bcrypt from 'bcrypt';

export enum Roles {
    STUDENT = 'STUDENT',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
}

export class User {
    private username?: string;
    private firstName?: string;
    private lastName?: string;
    private preposition?: string;
    private profilePicture?: string;
    private subjectAreaID?: number;
    constructor(
        private _id: number,
        private _email: string,
        private _password: string,
        private _level: number,
        private _role: Roles,
        private _levelProgress: number
    ) {}

    public set id(value: number) {
        this._id = value;
    }

    public get id(): number {
        return this._id;
    }

    public set email(value: string) {
        this._email = value;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get password(): string {
        return this._password;
    }

    public set level(value: number) {
        this._level = value;
    }
    public set role(value: Roles) {
        this._role = value;
    }
    public set levelProgress(value: number) {
        this._levelProgress = value;
    }

    /**
     * Validate a email with a regular expression.
     * @param userMail string
     * @returns false if the email is not valid
     */
    public static validateEmail(userMail: string): boolean {
        let regularExpression = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regularExpression.test(userMail);
    }

    /**
     * Validate a password with a regular expression.
     * @param userPassword string
     * @returns false if the password is not valid
     */
    public static validatePassword(userPassword: string): boolean {
        let regularExpression = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
        return regularExpression.test(userPassword);
    }

    /**
     * Hash a password with bcrypt.
     * @param userPassword string
     * @returns returns the hashed password
     */
    public static hashPassword(userPassword: string): Promise<string> {
        return bcrypt.hash(userPassword, 6);
    }
}
