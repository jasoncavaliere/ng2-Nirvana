import { ValidationMessage } from "./validationMessage";
import { ServerException } from "./serverException";

export abstract class Response {
    public ValidationMessages: ValidationMessage[];
    public IsValid: boolean;
    public Exception: ServerException;

    public Success() {
        return this.IsValid && this.Exception == null;
    }
}
