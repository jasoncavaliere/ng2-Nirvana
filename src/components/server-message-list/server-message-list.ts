import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ValidationMessage } from "../../models/validationMessage";
import { MessageType } from "../../models/messageType";
import { Subject } from "rxjs";
@Component({
    selector : 'nirvana-servermessagelist',
    template : `
        <div>
            <h1>Alerts for {{componentName}}</h1>
            <alert *ngFor="let alert of errorMessages;let i = index" [type]="'danger'" dismissible="false"> {{ alert?.Message}}</alert>
            <alert *ngFor="let alert of exceptionMessages;let i = index" [type]="'danger'" dismissible="false"> {{ alert?.Message}}</alert>
            <alert *ngFor="let alert of warningMessages;let i = index" [type]="'warning'" dismissible="false"> {{ alert?.Message}}</alert>
            <alert *ngFor="let alert of infoMessages;let i = index" [type]="'success'" dismissible="false"> {{ alert?.Message }}</alert>
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
        console.log('subscribing');
        this.receivedMessages.subscribe((event) => {
            this.setMessages(event);
        });
    }
    public ngOnDestroy() {
        console.log('unsubscribing');
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
        console.log(messages);
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
