import { Test } from '../models/test';

/**
 * The TestRepository Singleton class, used for getting.
 * @author Thijs van Rixoort
 */
export class TestRepository {
    private static instance: TestRepository | null = null;

    private constructor() {}

    public static getInstance(): TestRepository {
        if (TestRepository.instance === null) {
            TestRepository.instance = new TestRepository();
        }
        return TestRepository.instance;
    }

    /**
     * Gets the test from the database.
     * @returns a Test[].
     * @author Thijs van Rixoort
     */
    public async getTest(): Promise<Test[]> {
        return await Test.findAll({ attributes: ['id', 'message'] });
    }
}
