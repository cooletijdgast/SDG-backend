import { Request, Response } from 'express';
import { Contact } from '../repository/models/contact';
import { ContactCheck } from '../repository/models/contact';
import { ContactFormService } from '../services/contact';

export class ContactFormController {
    private static instance: ContactFormController | null = null;
    private contactFormService: ContactFormService = ContactFormService.getInstance();

    private constructor() {}

    public static getInstance(): ContactFormController {
        if (ContactFormController.instance === null) {
            ContactFormController.instance = new ContactFormController();
        }
        return ContactFormController.instance;
    }

    /**
     * Saves the contact form data to the database.
     * @author Vincent Obahiagbon
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @returns {Promise<void>} A Promise that resolves once the contact form data has been saved.
     */

    public async saveContactForm(request: Request, response: Response): Promise<void> {
        const contact = new ContactCheck(request).getContact();
        console.log('controller :', contact);
        if (contact !== null) {
            try {
                // Save the contact to the database
                const savedContact = await this.contactFormService.saveContact(contact);
                response.status(200).json(savedContact);
            } catch (error) {
                console.error(error);
                response.status(500).json({ error: 'Error saving contact to database' });
            }
        } else {
            response.status(400).json({ error: 'Invalid contact data' });
        }
    }
}
