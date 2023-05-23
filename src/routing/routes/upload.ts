import { Router, Request, Response } from 'express';
import { UploadController } from '../../controllers/upload';
import { UploadService } from '../../services/upload';

export class UploadRoute {
    private router: Router;
    private uploadController: UploadController;

    constructor(private uploadService: UploadService) {
        this.router = Router();
        this.uploadController = new UploadController(this.uploadService);
        this.initRoutes();
    }

    private initRoutes() {
        /**
         * @author Youri Janssen
         * @description calls the create function from the ContentController.
         * @param {Request} request containing the content object.
         * @param {Response} response (unused)
         */
        this.router.post('/', (request: Request, response: Response) => {
            this.uploadController.create(request, response);
        });

        /**
         * @author Youri Janssen
         * @description calls the getSDG function from the UploadController.
         * @param {Request} request (unused)
         * @param {Response} response containing the SDG object.
         */
        this.router.get('/SDG', (request: Request, response: Response) => {
            this.uploadController.getSDG(request, response);
        });

        /**
         * @author Youri Janssen
         * @description calls the getSubject function from the UploadController.
         * @param {Request} request (unused)
         * @param {Response} response containing the subject object.
         */
        this.router.get('/Subject', (request: Request, response: Response) => {
            this.uploadController.getSubject(request, response);
        });
    }
    public getRouter(): Router {
        return this.router;
    }
}
