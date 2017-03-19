import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ValidationMessage } from "../../models/validationMessage";
import { Subject } from "rxjs/Subject";
import MessageType from "../../models/messageType";

@Component({
    selector : 'nirvana-servermessagelist',
    template : `
        <div>
            <div *ngFor="let alert of errorMessages;let i = index" class="'danger'" dismissible="false"> {{ alert?.Message}}</div>
            <div *ngFor="let alert of exceptionMessages;let i = index" class="'danger'" dismissible="false"> {{ alert?.Message}}</div>
            <div *ngFor="let alert of warningMessages;let i = index" class="'warning'" dismissible="false"> {{ alert?.Message}}</div>
            <div *ngFor="let alert of infoMessages;let i = index" class="'success'" dismissible="false"> {{ alert?.Message }}</div>
        </div>
        `
})
export class ServerMessageListComponent implements OnInit, OnDestroy {

    @Input() public componentName: string;
    @Input() public receivedMessages: Subject<ValidationMessage[]>;

    public infoMessages: ValidationMessage[] = [];
    public warningMessages: ValidationMessage[] = [];
    public errorMessages: ValidationMessage[] = [];
    public exceptionMessages: ValidationMessage[] = [];

    constructor() {
        this.infoMessages = [];
        this.warningMessages = [];
        this.errorMessages = [];
        this.exceptionMessages = [];
    }

    public ngOnInit() {
        this.receivedMessages.subscribe((event) => {
            this.setMessages(event);
        });
    }
    public ngOnDestroy() {
        this.receivedMessages.unsubscribe();
    }

    public clearAll() {
        this.warningMessages = [];
        this.infoMessages = [];
        this.errorMessages = [];
        this.exceptionMessages = [];
    }

    private setMessages(messages: ValidationMessage[]) {
        this.clearAll();
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
