/**
 * Our communication format "JSend".
 * @author Thijs van Rixoort
 */
export class JSend<T> {
    public status?: 'fail' | 'succes';
    public data: { post: T | null } = { post: null };

    constructor(post: T) {
        this.data.post = post;
    }
}
