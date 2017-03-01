export class AuthTokenResolver {

    public isEnabled: boolean;

    constructor() {
        this.isEnabled = false;
    }

    public getToken(url: string): Promise<string> {
        return Promise.resolve(null);
    }

}
