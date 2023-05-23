/**
 * @author Lars Brinker
 */
import { Roles, User } from '../../business/user';
import { RegisterInterface } from '../interfaces/register-interface';
import { pool } from '../../util/mysql/mysql-database';
import * as mysql from 'mysql2/promise';
import { LoginMysql } from './login';

export class RegisterMysql implements RegisterInterface {
    /**
     * Search for an user by email address, if an user is not found null is returned.
     * @param email string
     * @returns a new user object or null
     */
    public async getUserByMail(email: string): Promise<User | null> {
        let user: User | null = null;
        await pool
            .execute<mysql.RowDataPacket[]>('SELECT * FROM `user` WHERE email = ?', [email])
            .then(([rows, fields]) => {
                if (rows != undefined && rows.length > 0) {
                    user = LoginMysql.mysqlToUser(rows[0]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return user;
    }

    /**
     * Create a new user in the database.
     * @param userMail string
     * @param userPassword string
     * @returns a new user
     */
    public async createUser(userMail: string, userPassword: string): Promise<User> {
        let user: User | null = null;
        userPassword = await User.hashPassword(userPassword);
        let test = await pool
            .query('INSERT INTO `user` (email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?)', [
                userMail,
                userPassword,
                new Date(),
                new Date(),
            ])
            .then(async (result) => {
                let insertedUser = await this.getUserByMail(userMail);
                user = new User(insertedUser!.id, userMail, userPassword, 1, Roles.STUDENT, 0);
            })
            .catch((error) => {
                console.log(error);
            });
        return user!;
    }
}
