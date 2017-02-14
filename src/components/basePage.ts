import { ValidationMessage } from "../models/validationMessage";
import { Mediator } from "../services/mediator";
import { ErrorService } from "../services/errorrService";
import { MessageType } from "../models/messageType";
import { Query } from "../models/query";
import { QueryResponse } from "../models/queryResponse";
import { CommandResponse } from "../models/commandResponse";
import { Command } from "../models/command";
import { EventEmitter, Output } from "@angular/core";
export abstract class BasePage {

    @Output() public messagesReceived = new EventEmitter();
    public messages: ValidationMessage[];
    constructor(private mediator: Mediator, public errorService: ErrorService, public componentName: string) {
    }

    public showSuccess() {
        this.showInfo("Your Changes were saved");
    }

    public showInfo(message: string) {
        this.errorService.showErrors(this.componentName, [new ValidationMessage(MessageType.Info, "", message)]);
    }

    public showWarning(message: string) {
        this.errorService.showErrors(this.componentName, [new ValidationMessage(MessageType.Warning, "", message)]);
    }

    public showError(message: string) {
        this.errorService.showErrors(this.componentName, [new ValidationMessage(MessageType.Error, "", message)]);
    }

    public showException(message: string) {
        this.errorService.recieveMessages([new ValidationMessage(MessageType.Exception, "", message)], this.componentName);
    }

    public query<U>(query: Query<U>): Promise<QueryResponse<U>> {
        return this.mediator.query(query)
            .then((res) => {
                let result = <QueryResponse<U>> res;
                console.log('emitting messages');
                this.messagesReceived.emit(result.ValidationMessages);
                this.messages = result.ValidationMessages;
                return <QueryResponse<U>> res;
            });
    }

    public command<U>(command: Command<U>): Promise<CommandResponse<U>> {
        return this.mediator.command(command)
            .then((res) => {
                let result = <QueryResponse<U>> res;
                console.log('emitting messages');
                this.messagesReceived.emit(result.ValidationMessages);
                this.messages = result.ValidationMessages;
                return <QueryResponse<U>> res;
            });
    }
}
