/**
 * @author Youri Janssen
 * @description This interface is used to create a new content object.
 */

import { UploadBusiness } from '../../business/upload';

export interface UploadInterface {
    getSDG(): Promise<UploadBusiness.SDG[]>;
    getSubject(): Promise<UploadBusiness.SubjectArea[]>;
    create(title: string, text: string, media: string, sdg: string, subject: string): Promise<UploadBusiness.Create>;
}
