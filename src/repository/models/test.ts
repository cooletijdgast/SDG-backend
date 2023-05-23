import { Model } from 'sequelize';

/**
 * A simple test class that we can use to check if the communication with the frontend works as expected.
 * @author Thijs van Rixoort
 */
export class Test extends Model {
    public message!: string;
}
