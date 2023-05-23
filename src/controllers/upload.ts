import { Request, Response } from 'express';
import { JSend } from '../util/communication';
import { UploadBusiness } from '../business/upload';
import { UploadService } from '../services/upload';

export class UploadController {
    public constructor(private uploadService: UploadService) {}

    /**
     * @author Youri Janssen
     * @description This controller functions checks if the getSDG function from the uploadService is succesfull.
     * @param {Request} request the request object. (unused)
     * @param {Response} response the response object contains a JSON object with an array of SDG's.
     */
    public async getSDG(request: Request, response: Response) {
        const responseObject: JSend<UploadBusiness.SDG[]> = new JSend<UploadBusiness.SDG[]>(
            await this.uploadService.getSDG()
        );

        if (responseObject.data.post!.length === 0) {
            responseObject.status = 'fail';
            response.status(404).json(responseObject);
        } else {
            responseObject.status = 'succes';
            response.status(200).json(responseObject);
        }
    }

    /**
     * @author Youri Janssen
     * @param {Request} request the request object. (unused)
     * @param {Response} response the response object contains a JSON object with an array of subject areas.
     */
    public async getSubject(request: Request, response: Response) {
        const responseObject: JSend<UploadBusiness.SubjectArea[]> = new JSend<UploadBusiness.SubjectArea[]>(
            await this.uploadService.getSubject()
        );

        if (responseObject.data.post!.length === 0) {
            responseObject.status = 'fail';
            response.status(404).json(responseObject);
        } else {
            responseObject.status = 'succes';
            response.status(200).json(responseObject);
        }
    }

    /**
     * @author Youri Janssen
     * @description
     * @param {Request} request the request object containing the input created by the user.
     * @param {Response} response the response object. (unused)
     * @param validation checks if the input is valid.
     */
    public async create(request: Request, response: Response) {
        let validation = new UploadBusiness.CreateValidation();
        let validationDone = false;
        if (validation.validateCreate(request.body) === true) {
            validationDone = true;

            let upload: UploadBusiness.Create = await this.uploadService.create(
                request.body.contentTitle,
                request.body.contentText,
                request.body.contentMedia,
                request.body.dropdownSDG,
                request.body.dropdownSubject
            );
            if (upload !== null && validationDone === true) {
                response.status(200).json({ status: 'success', data: { post: { message: 'upload succesful' } } });
            } else {
                response.status(400).json({ status: 'fail', data: { post: { message: 'upload failedddddd' } } });
            }
        }
    }
}
