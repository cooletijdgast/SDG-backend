import { Request, Response } from 'express';
import { Test } from '../repository/models/test';
import { TestService } from '../services/test';
import { JSend } from '../util/communication';

/**
 * The TestController Singleton class, used for handling requests and responses.
 * @author Thijs van Rixoort
 */
export class TestController {
    private static instance: TestController | null = null;
    private testService: TestService = TestService.getInstance();

    private constructor() {}

    /**
     * Returns the single instance of the TestController class. If this class does not have an instance yet it creates one.
     * @returns the single TestController object.
     * @author Thijs van Rixoort
     */
    public static getInstance(): TestController {
        if (TestController.instance === null) {
            TestController.instance = new TestController();
        }
        return TestController.instance;
    }

    /**
     * Gets the test from the database and returns them with statuscode 200 if it exists, else it just returns statuscode 404.
     * @param _request Unused Request object.
     * @param response The Response object.
     * @author Thijs van Rixoort
     */
    public async getTest(_request: Request, response: Response): Promise<void> {
        let responseObject: JSend<Test[]> = new JSend<Test[]>(await this.testService.getTest());

        if (responseObject.data.post!.length === 0) {
            responseObject.status = 'fail';
            response.status(404).json(responseObject);
        } else {
            responseObject.status = 'succes';
            response.status(200).json(responseObject);
        }
    }
}
