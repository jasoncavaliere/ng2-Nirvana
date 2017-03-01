import { ValidationMessage } from "../models/validationMessage";
import { Mediator } from "../services/mediator";
import { MessageType } from "../models/messageType";
import { Query } from "../models/query";
import { QueryResponse } from "../models/queryResponse";
import { CommandResponse } from "../models/commandResponse";
import { Command } from "../models/command";
import { EventEmitter, Output, Input } from "@angular/core";
export abstract class BasePage {

    @Output() public messagesReceived = new EventEmitter();

    constructor(private mediator: Mediator, public componentName: string, public pageHeader: string, public pageSubHeader: string) {
    }

    public showSuccess() {
        this.showInfo("Your Changes were saved");
    }

    public showInfo(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Info, "", message)]);
    }

    public showWarning(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Warning, "", message)]);
    }

    public showError(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Error, "", message)]);
    }

    public showException(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Exception, "", message)]);
    }

    public query<U>(query: Query<U>): Promise<QueryResponse<U>> {
        return this.mediator.query(query)
            .then((res) => {
                let result = <QueryResponse<U>> res;
                this.messagesReceived.emit(result.ValidationMessages);
                return <QueryResponse<U>> res;
            }, (res) => {
                let result = <QueryResponse<U>> res;
                this.messagesReceived.emit(result.ValidationMessages);
                return <QueryResponse<U>> res;
            });
    }

    public command<U>(command: Command<U>): Promise<CommandResponse<U>> {
        return this.mediator.command(command)
            .then((res) => {
                let result = <QueryResponse<U>> res;
                this.messagesReceived.emit(result.ValidationMessages);
                return <QueryResponse<U>> res;
            }, (res) => {
                let result = <QueryResponse<U>> res;
                this.messagesReceived.emit(result.ValidationMessages);
                return <QueryResponse<U>> res;
            });
    }
}
