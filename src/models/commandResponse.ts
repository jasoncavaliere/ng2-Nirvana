import { Response } from "./response";
export class CommandResponse<TResult> extends Response {
    public Result: TResult;

    public Throw() {
        if (this.Exception) {
            throw this.Exception.Message;
        }
    }
}
