/**
 * @author Lars Brinker
 */

import { MysqlCreate, pool } from './mysql-database';
import * as fs from 'fs';

export class MysqlSeed {
    private mysqlFiles: string[] = ['sdgSeed.sql', 'userSeed.sql', 'subjectArea.sql'];

    public async seed(): Promise<void> {
        for (const file of this.mysqlFiles) {
            const generatedScript = fs.readFileSync('src/util/mysql/sql/' + file).toString();
            await pool
                .query(generatedScript)
                .then(() => {
                    console.log(`${file} seeded`);
                })
                .catch((error) => {
                    if (error.code == 'ER_DUP_ENTRY') {
                        console.log(`${file} is already seeded`);
                        return;
                    }
                });
        }
    }
}
