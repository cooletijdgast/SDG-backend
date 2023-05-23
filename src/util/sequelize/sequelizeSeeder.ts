/**
 * @author Lars Brinker
 */

import { Roles } from '../../business/user';
import { User as businessUser } from '../../business/user';
import { User } from '../../repository/models/user';
import { SDG } from '../../repository/models/sdg';
import { SubjectArea } from '../../repository/models/subjectarea';

export class SequelizeSeeder {
    private user = new businessUser(0, '', '', 1, Roles.STUDENT, 0);
    public async seed(): Promise<void> {
        try {
            await this.seedSubjectArea();
            await this.seedUser();
            await this.seedSDG();
            console.log('Seeding done!');
        } catch (e: any) {
            console.error(`Database already seeded: ${e}`);
        }
    }

    private async seedUser(): Promise<void> {
        await User.bulkCreate([
            {
                username: 'admin',
                password: await businessUser.hashPassword('Admin1234$'),
                email: 'admin@test.com',
                firstName: 'admin',
                preposition: 'van',
                lastName: 'admin',
                subjectAreaID: 2,
                role: Roles.ADMIN,
                level: 99,
                levelProgress: 999,
            },
            {
                username: 'Olivia-Green',
                password: await businessUser.hashPassword('Test1234$'),
                email: 'olivia@hotmail.com',
                firstName: 'Olivia',
                preposition: '',
                lastName: 'Green',
                subjectAreaID: 6,
                role: Roles.STUDENT,
                level: 1,
                levelProgress: 100,
            },
            {
                username: 'MaxEco',
                password: await businessUser.hashPassword('Test1234$'),
                email: 'max@hotmail.com',
                firstName: 'Max',
                preposition: '',
                lastName: 'Eco',
                subjectAreaID: 1,
                role: Roles.MODERATOR,
                level: 1,
                levelProgress: 1,
            },
        ]);
        console.log('User seeded!');
    }

    private async seedSubjectArea(): Promise<void> {
        await SubjectArea.bulkCreate([
            {
                title: 'Bouw en Infrastructuur',
                description: 'Bouw en Infrastructuur',
            },
            {
                title: 'Design en Creatie',
                description: 'Design en Creatie',
            },
            {
                title: 'Economie en Management',
                description: 'Economie en Management',
            },
            {
                title: 'Gezondheid',
                description: 'Gezondheid',
            },
            {
                title: 'ICT',
                description: 'ICT',
            },
            {
                title: 'Logistiek, Lucht- en Zeevaart',
                description: 'Logistiek, Lucht- en Zeevaart',
            },
            {
                title: 'Media en Communicatie',
                description: 'Media en Communicatie',
            },
            {
                title: 'Mens en Maatschappij',
                description: 'Mens en Maatschappij',
            },
            {
                title: 'Onderwijs en Opvoeding',
                description: 'Onderwijs en Opvoeding',
            },
            {
                title: 'Recht en Bestuur',
                description: 'Recht en Bestuur',
            },
            {
                title: 'Sport en Voeding',
                description: 'Sport en Voeding',
            },
            {
                title: 'Techniek',
                description: 'Techniek',
            },
        ]);
        console.log('Subjectarea seeded!');
    }

    private async seedSDG(): Promise<void> {
        SDG.bulkCreate([
            {
                title: 'No poverty',
                text: 'No poverty',
                picture:
                    'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/02/goal1.png',
            },
            {
                title: 'Zero hunger',
                text: 'Zero hunger',
                picture: 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/02/2-1.jpg',
            },
            {
                title: 'Good health and well-being',
                text: 'Good health and well-being',
                picture: 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/3.jpg',
            },
            {
                title: 'Quality education',
                text: 'Quality education',
                picture: 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/4.jpg',
            },
            {
                title: 'Gender equality',
                text: 'Gender equality',
                picture: 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/5.jpg',
            },
        ]);
        console.log('SDG seeded!');
    }
}
