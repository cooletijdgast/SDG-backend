/**
 * @author Youri Janssen
 * @description This class is used to create a new content object.
 */
export namespace UploadBusiness {
    export class Create {
        title!: string;
        text!: string;
        media!: string;
        sdg!: string;
        subject!: string;
    }

    export class CreateValidation {
        public validateCreate(createObject: Create): boolean {
            this.validateTitle(createObject.title);
            this.validateText(createObject.text);
            this.validateMedia(createObject.media);
            this.validateSDG(createObject.sdg);
            this.validateSubject(createObject.subject);
            if (
                this.validateTitle(createObject.title) !== null &&
                this.validateText(createObject.text) !== null &&
                this.validateMedia(createObject.media) !== null &&
                this.validateSDG(createObject.sdg) !== null &&
                this.validateSubject(createObject.subject) !== null
            ) {
                return true;
            } else {
                return false;
            }
        }

        public validateTitle(title: string): boolean {
            let regexp = new RegExp(/^.{5,250}$/);
            return regexp.test(title);
        }

        public validateText(text: string): boolean {
            let regexp = new RegExp(/^.{5,2500}$/);
            return regexp.test(text);
        }

        public validateMedia(media: string): boolean {
            let regexp = new RegExp(/\.(jpg|png)$/i);
            return regexp.test(media);
        }

        public validateSubject(subject: string): boolean {
            let regexp = new RegExp(/\S/);
            return regexp.test(subject);
        }

        public validateSDG(sdg: string): boolean {
            let regexp = new RegExp(/\S/);
            return regexp.test(sdg);
        }
    }

    /**
     * @author Youri Janssen
     * @description This class is used to create a new SubjectArea object.
     */
    export class SubjectArea {
        id?: number;
        title?: string;
        description?: string;
    }

    /**
     * @author Youri Janssen
     * @description This class is used to create a new SDG object.
     */
    export class SDG {
        id?: number;
        title?: string;
        text?: string;
        picture?: string;
    }
}
