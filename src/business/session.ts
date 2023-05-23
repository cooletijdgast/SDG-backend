/**
 * @author Lars Brinker
 */
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { LoginService } from '../services/login';

export class Session {
    constructor(private sessionID: string, private _userID: number, private _expirationDate: Date) {}

    public set expirationDate(value: Date) {
        this._expirationDate = value;
    }

    public set userID(value: number) {
        this._userID = value;
    }

    public get userID(): number {
        return this._userID;
    }

    public get expirationDate(): Date {
        return this._expirationDate;
    }

    public set sessionId(value: string) {
        this.sessionID = value;
    }

    public get sessionId(): string {
        return this.sessionID;
    }

    public async validateCookie(cookieToValidate: Session | null): Promise<boolean> {
        let validated: boolean = false;
        if (cookieToValidate != null) {
            if (cookieToValidate.expirationDate > new Date()) {
                validated = true; // Cookie is valid
            } else {
                validated = false; // Cookie is not valid
            }
        }
        return validated;
    }

    /**
     * Set the cookie with the generated session to a user.
     * @param userID the userID of who is loggin in
     */
    public static setCookieForUser(userID: number): Session {
        let tempSession: Session = new Session('', userID, new Date());
        tempSession.sessionID = randomUUID();
        const currentDate: Date = new Date();
        // Sets the current time + 3 months from now
        tempSession.expirationDate = new Date(currentDate.getTime() + 7889400000);
        // Set the cookie for the given user, with the name sessionID and the value of the generated sessionID.
        return tempSession;
    }
}
