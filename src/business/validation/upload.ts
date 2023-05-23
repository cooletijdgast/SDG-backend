// export namespace ContentValidation {
//     export class Content {
//         public validateTitle(title: string): boolean {
//             let regexp = new RegExp(/^.{5,250}$/);
//             return regexp.test(title);
//         }

//         public validateText(text: string): boolean {
//             let regexp = new RegExp(/^.{5,2500}$/);
//             return regexp.test(text);
//         }

//         public validateMedia(media: string): boolean {
//             let regexp = new RegExp(/\.(jpg|png)$/i);
//             return regexp.test(media);
//         }

//         public validateSDG(sdg: string): boolean {
//             let regexp = new RegExp(/\S/);
//             return regexp.test(sdg);
//         }

//         public validateSubject(subject: string): boolean {
//             let regexp = new RegExp(/\S/);
//             return regexp.test(subject);
//         }
//     }

//     export class SDG {
//         validateTitle(title: string): boolean {
//             let regexp = new RegExp(/\S/);
//             return regexp.test(title);
//         }
//     }

//     export class Subject {
//         validateTitle(title: string): boolean {
//             let regexp = new RegExp(/\S/);
//             return regexp.test(title);
//         }
//     }
// }
