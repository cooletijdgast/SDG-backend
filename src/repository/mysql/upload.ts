import { UploadInterface } from '../interfaces/upload-interface';
import { UploadBusiness } from '../../business/upload';
import { pool } from '../../util/mysql/mysql-database';
import * as mysql from 'mysql2/promise';

export class UploadMysql implements UploadInterface {
    public constructor() {}

    /**
     * @author Youri Janssen
     * @description
     * @returns
     */
    public async getSDG(): Promise<UploadBusiness.SDG[]> {
        let SDG: UploadBusiness.SDG[] = [];
        console.log('test');
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `sdg`', [])
            .then(([rows, fields]) => {
                rows.forEach((row) => {
                    console.log(row);
                    SDG.push({ title: row.title });
                });
            })
            .catch((error) => {
                console.log(error);
            });
        return SDG;
    }

    /**
     * @author Youri Janssen
     * @description
     * @returns
     */
    public async getSubject(): Promise<UploadBusiness.SubjectArea[]> {
        let SubjectArea: UploadBusiness.SubjectArea[] = [];
        await pool.query<mysql.RowDataPacket[]>('SELECT * FROM `subjectarea`', []).then(([rows, fields]) => {
            rows.forEach((row) => {
                SubjectArea.push({ title: row.title });
            });
        });
        return SubjectArea;
    }

    /**
     * @author Youri Janssen
     * @description
     * @returns
     */
    public async create(
        title: string,
        text: string,
        media: string,
        sdg: string,
        subject: string
    ): Promise<UploadBusiness.Create> {
        let returnValue: UploadBusiness.Create = {
            title: '',
            text: '',
            media: '',
            sdg: '',
            subject: '',
        };
        await pool
            .query<mysql.RowDataPacket[]>(
                'INSERT INTO `upload` (title, text, media, sdg, subject) VALUES (?, ?, ?, ?, ?)',
                [title, text, media, sdg, subject]
            )
            .then(([rows, fields]) => {
                returnValue = {
                    title: title,
                    text: text,
                    media: media,
                    sdg: sdg,
                    subject: subject,
                };
            })
            .catch((error) => {
                console.log(error);
            });
        return returnValue;
    }
}
