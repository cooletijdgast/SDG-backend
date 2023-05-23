import { Test } from '../repository/models/test';
import { TestRepository } from '../repository/sequelize/test';

/**
 * The TestService Singleton class, used for enforcing business rules.
 * @author Thijs van Rixoort
 */
export class TestService {
    private static instance: TestService | null = null;
    private testRepository: TestRepository = TestRepository.getInstance();

    private constructor() {}

    /**
     * Returns the single instance of the TestService class. If this class does not have an instance yet it creates one.
     * @returns the single TestService object.
     * @author Thijs van Rixoort
     */
    public static getInstance(): TestService {
        if (TestService.instance === null) {
            TestService.instance = new TestService();
        }
        return TestService.instance;
    }

    /**
     * Gets the test from the database.
     * @returns a Test[].
     * @author Thijs van Rixoort
     */
    public async getTest(): Promise<Test[]> {
        return await this.testRepository.getTest();
    }
}
