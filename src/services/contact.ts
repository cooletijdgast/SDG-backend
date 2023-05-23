import { Contact } from '../repository/models/contact';
import { ContactRepository } from '../repository/sequelize/contact';

/**
 * The ContactFormService Singleton class, used for enforcing business rules.
 * @author Vincent Obahiagbon
 */
export class ContactFormService {
    private static instance: ContactFormService | null = null;
    private contactRepository: ContactRepository = ContactRepository.getInstance();

    private constructor() {
        this.contactRepository = this.contactRepository;
    }

    /**
     * Returns the single instance of the ContactFormService class. If this class does not have an instance yet it creates one.
     * @returns the single ContactFormService object.
     * @author Vincent Obahiagbon
     */
    public static getInstance(): ContactFormService {
        if (ContactFormService.instance === null) {
            ContactFormService.instance = new ContactFormService();
        }
        return ContactFormService.instance;
    }

    /**
     * Saves a new contact to the database.
     * @author Vincent Obahiagbon
     * @param contact The contact object to be saved.
     * @returns a Promise that resolves to a boolean indicating whether the contact was saved successfully.
     */
    public async saveContact(contact: Contact): Promise<boolean> {
        console.log('service:', contact);
        try {
            const savedContact = await this.contactRepository.create(contact);
            return savedContact !== null;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
