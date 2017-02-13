import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ValidationMessage } from "../../models/validationMessage";
import { MessageType } from "../../models/messageType";
import { ErrorService } from "../../services/errorrService";
@Component({
    selector : 'nirvana-servermessagelist',
    templateUrl : './server-message-list.html'
})
export class ServerMessageListComponent implements OnInit, OnDestroy {

    public infoMessages: ValidationMessage[] = [];
    public warningMessages: ValidationMessage[] = [];
    public errorMessages: ValidationMessage[] = [];
    public exceptionMessages: ValidationMessage[] = [];
    public componentErrorsKey: string;

    constructor(private errorService: ErrorService) {
        this.infoMessages = [];
        this.warningMessages = [];
        this.errorMessages = [];
        this.exceptionMessages = [];
    }

    public ngOnDestroy() {

        this.errorService.unregisterComponent(this.componentErrorsKey);
    }

    public ngOnInit() {
        // this.errorService.registerComponent(this.componentErrorsKey);
        // this.onMessagesReceived.subscribe((x) => this.updateAlertComponent(alertComponent, x));
    }

    public clearAll() {
        this.warningMessages = [];
        this.infoMessages = [];
        this.errorMessages = [];
        this.exceptionMessages = [];
    }

    public setMessages(messages: ValidationMessage[]) {
        for (let message of messages) {
            console.log('setting message ' + message.Message);
            if (message.Key === "") {
                switch (message.MessageType) {
                    case MessageType.Error:
                        this.errorMessages.push(message);
                        break;
                    case MessageType.Exception:
                        this.exceptionMessages.push(message);
                        break;
                    case MessageType.Warning:
                        this.warningMessages.push(message);
                        break;
                    case MessageType.Info:
                        this.infoMessages.push(message);
                        break;
                    default:
                }
            }
        }
    }
}
