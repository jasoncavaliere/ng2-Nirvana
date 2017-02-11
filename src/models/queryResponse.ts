import { Response } from "./response";
export class QueryResponse<TResult> extends Response {
    public Result: TResult;
    public Throw() {
        if (this.Exception) {
            throw this.Exception.Message;
        }
    }
}
