/**
 * @author Lars Brinker
 */

import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

export class MysqlCreate {
    private static instance: MysqlCreate | null = null;

    public static getInstance(): MysqlCreate {
        if (MysqlCreate.instance === null) {
            MysqlCreate.instance = new MysqlCreate();
        }
        return MysqlCreate.instance;
    }

    private DB_NAME: string = process.env.DB_NAME!;
    private DB_USER: string = process.env.DB_USER!;
    private DB_PASSWORD: string = process.env.DB_PASSWORD!;

    public poolConfig = {
        host: 'localhost',
        user: this.DB_USER,
        password: this.DB_PASSWORD,
        database: this.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    };
}

export let pool = mysql.createPool(MysqlCreate.getInstance().poolConfig);
