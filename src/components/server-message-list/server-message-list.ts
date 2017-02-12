import { Component, Input } from "@angular/core";
import { ValidationMessage } from "../../models/validationMessage";
import { MessageType } from "../../models/messageType";
@Component({
    selector : 'nirvana-servermessagelist',
    templateUrl : './server-message-list.html'
})
export class ServerMessageListComponent {

    @Input() public infoMessages: ValidationMessage[] = [];
    @Input() public warningMessages: ValidationMessage[] = [];
    @Input() public errorMessages: ValidationMessage[] = [];
    @Input() public exceptionMessages: ValidationMessage[] = [];

    public clearAll() {
        this.warningMessages = [];
        this.infoMessages = [];
        this.errorMessages = [];
        this.exceptionMessages = [];
    }

    public setMessages(messages: ValidationMessage[]) {
        for (let message of messages) {
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
