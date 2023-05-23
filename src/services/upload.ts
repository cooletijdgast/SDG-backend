import { response } from 'express';
import { UploadInterface } from '../repository/interfaces/upload-interface';
import { UploadBusiness } from '../business/upload';

export class UploadService {
    public constructor(private uploadInterface: UploadInterface) {}

    /**
     * @author Youri Janssen
     * @description awaits the getSDG function from the uploadRepository;
     * @returns Promise containing a JSON object with an array of SDG's.
     */

    public async getSDG(): Promise<UploadBusiness.SDG[]> {
        let returnValue: UploadBusiness.SDG[] = [];
        try {
            returnValue = await this.uploadInterface.getSDG();
        } catch (error) {
            response.status(400).json('error');
        }
        return returnValue;
    }
    /**
     * @author Youri Janssen
     * @description awaits the getSubject function from the uploadRepository.
     * @returns Promise containing a JSON object with an array of Subject Area's.
     */

    public async getSubject(): Promise<UploadBusiness.SubjectArea[]> {
        let returnValue: UploadBusiness.SubjectArea[] = [];
        try {
            returnValue = await this.uploadInterface.getSubject();
        } catch (error) {
            response.status(400).json('error');
        }
        return returnValue;
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
        let contentCreated: Promise<UploadBusiness.Create>;
        contentCreated = this.uploadInterface.create(title, text, media, sdg, subject);
        return contentCreated;
    }
}
