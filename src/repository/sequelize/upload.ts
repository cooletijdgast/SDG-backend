import { UploadBusiness } from '../../business/upload';
import { SDG } from '../models/sdg';
import { SubjectArea } from '../models/subjectarea';
import { response } from 'express';
import { Upload } from '../models/upload';
import { UploadInterface } from '../interfaces/upload-interface';

export class UploadSequelize implements UploadInterface {
    public constructor() {}

    /**
     * @author Youri Janssen
     * @description Get all SDG's from the database.
     * @returns returnValue: Promise object that represents an array of SDG's.
     */
    public async getSDG(): Promise<UploadBusiness.SDG[]> {
        let returnValue: UploadBusiness.SDG[] = [];
        try {
            returnValue = await SDG.findAll({ attributes: ['id', 'title'] });
        } catch (error) {
            response.status(400).json("Something went wrong while getting the SDG's.");
        }
        return returnValue;
    }

    /**
     * @author Youri Janssen
     * @description Get all subject areas from the database.
     * @returns returnValue: Promise object that represents an array of subject areas.
     */
    public async getSubject(): Promise<UploadBusiness.SubjectArea[]> {
        let returnValue: UploadBusiness.SubjectArea[] = [];
        try {
            returnValue = await SubjectArea.findAll({ attributes: ['id', 'title'] });
        } catch (error) {
            response.status(400).json('Something went wrong while getting the subject areas.');
        }
        return returnValue;
    }

    /**
     * @author Youri Janssen
     * @description awaits the create function from the content model.Then:
     */

    public async create(title: string, text: string, media: string, sdg: string, subject: string): Promise<Upload> {
        return await Upload.create({ title: title, text: text, media: media, sdg: sdg, subject: subject });
    }
}
