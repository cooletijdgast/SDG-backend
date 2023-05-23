/**
 * @author Lars Brinker
 */
import { pool } from '../../util/mysql/mysql-database';
import * as mysql from 'mysql2/promise';
import { Roles, User } from '../../business/user';
import { Session } from '../../business/session';
import { LoginInterface } from '../interfaces/login-interface';

export class LoginMysql implements LoginInterface {
    public constructor() {}

    public async getUserByMail(email: string): Promise<User | null> {
        let user: User | null = null;
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `user` where email = ?', [email])
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

    public async saveSession(userID: number, sessionID: string, expirationDate: Date): Promise<Session> {
        let session: Session | null = null;
        await pool
            .execute(
                'INSERT INTO `session` (sessionID, userID, expirationDate, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
                [sessionID, userID, expirationDate, new Date(), new Date()]
            )
            .then(() => {
                session = new Session(sessionID, userID, expirationDate);
            })
            .catch((error) => {
                console.log(error);
            });
        return session!;
    }

    public async deleteSession(sessionID: string): Promise<Number> {
        let result: Number = 0;
        await pool
            .execute<mysql.RowDataPacket[]>('DELETE FROM `session` WHERE sessionID = ?', [sessionID])
            .then(([rows, fields]) => {
                //TODO fix so it returns the correct number of affected rows
                // result = fields.affectedRows;
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    }

    public async getSession(sessionID: string): Promise<Session | null> {
        let session: Session | null = null;
        await pool
            .execute<mysql.RowDataPacket[]>('SELECT * FROM `session` WHERE sessionID = ?', [sessionID])
            .then(([rows, fields]) => {
                session = this.mysqlToSession(rows[0]);
            })
            .catch((error) => {
                console.log(error);
            });
        return session;
    }

    public async getUserBySession(sessionID: string): Promise<User | null> {
        let user: User | null = null;
        await pool
            .execute<mysql.RowDataPacket[]>(
                'SELECT user.id, user.email, user.level, user.levelprogress, user.role, Session.userID FROM `User` ' +
                    ' join Session on User.id = Session.userID WHERE Session.sessionID = ?',
                [sessionID]
            )
            .then(([rows, fields]) => {
                user = LoginMysql.mysqlToUser(rows[0]);
            })
            .catch((error) => {
                console.log(error);
            });
        return user;
    }

    /**
     * Convert mysql return values to a business User object
     * @param element mysql.RowDataPacket
     * @returns business User object
     */
    public static mysqlToUser(element: mysql.RowDataPacket): User {
        const user: User = new User(0, '', '', 1, Roles.STUDENT, 0);
        user.id = element['id'];
        user.password = element['password'];
        user.email = element['email'];
        user.role = element['role'];
        user.level = element['level'];
        user.levelProgress = element['levelProgress'];
        return user;
    }

    private mysqlToSession(element: mysql.RowDataPacket): Session {
        const session: Session = new Session('', 0, new Date());
        session.sessionId = element['sessionID'];
        session.userID = element['userID'];
        session.expirationDate = element['expirationDate'];
        return session;
    }
}
