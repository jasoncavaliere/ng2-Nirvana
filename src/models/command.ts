export abstract class Command<TResult> {
    constructor(public endpointName: string) {
    }
}
