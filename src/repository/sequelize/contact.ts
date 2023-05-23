import { Contact } from '../models/contact';
import { sequelize } from '../../util/sequelize/sequelize-database';

/**
 * @author Vincent Obahiagbon
 * The ContactRepository Singleton class, used for getting and modifying Contact data in the database.
 */
export class ContactRepository {
    private static instance: ContactRepository | null = null;

    private constructor() {}

    /**
     * @author Vincent Obahiagbon
     * Returns the single instance of the ContactRepository class. If this class does not have an instance yet it creates one.
     * @returns the single ContactRepository object.
     */
    public static getInstance(): ContactRepository {
        if (ContactRepository.instance === null) {
            ContactRepository.instance = new ContactRepository();
        }
        return ContactRepository.instance;
    }

    private contactDataModel: typeof Contact = Contact;

    public create(contact: Contact): Promise<boolean> {
        console.log('repo:', contact);
        return this.contactDataModel
            .create(contact)
            .then(() => true)
            .catch(() => false);
    }
}
