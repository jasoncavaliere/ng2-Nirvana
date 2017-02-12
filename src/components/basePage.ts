import { Input } from "@angular/core";
import { EventEmitter } from "@angular/common/src/facade/async";
import { ValidationMessage } from "../models/validationMessage";
import { Mediator } from "../services/mediator";
import { ServerMessageListComponent } from "./server-message-list/server-message-list";
import { ErrorService } from "../services/errorrService";
import { MessageType } from "../models/messageType";
export abstract class BasePage {

    @Input() public componentName: string;
    @Input() protected generalMessages: ValidationMessage[];
    @Input() protected onMessagesReceived: EventEmitter<ValidationMessage[]> = new EventEmitter<ValidationMessage[]>();
    protected keyParameterSub: any;
    @Input() private validationMessageSubscription;

    constructor(public mediator: Mediator, private errors: ErrorService) {

        this.generalMessages = [];
    }

    public showSuccess() {
        this.showInfo("Your Changes were saved");
    }

    public showInfo(message: string) {
        this.errors.showErrors(this.componentName, [new ValidationMessage(MessageType.Info, "", message)]);
    }

    public showWarning(message: string) {
        this.errors.showErrors(this.componentName, [new ValidationMessage(MessageType.Warning, "", message)]);
    }

    public showError(message: string) {
        this.errors.showErrors(this.componentName, [new ValidationMessage(MessageType.Error, "", message)]);
    }

    public showException(message: string) {
        this.errors.showErrors(this.componentName, [new ValidationMessage(MessageType.Exception, "", message)]);
    }

    protected  registerEvents(alertComponent: ServerMessageListComponent) {
        let emitter = this.errors.registerComponent(this.componentName);
        this.validationMessageSubscription = emitter.subscribe((x) => this.receiveErrors(x));
        this.onMessagesReceived.subscribe((x) => this.updateAlertComponent(alertComponent, x));
    }

    protected disposeRegisteredEvents() {
        this.errors.unregisterComponent(this.componentName);
        this.onMessagesReceived.unsubscribe();
        if (this.keyParameterSub) {
            this.keyParameterSub.unsubscribe();
        }
    }

    private receiveErrors(messages: ValidationMessage[]) {
        this.generalMessages = messages;
        this.onMessagesReceived.emit(this.generalMessages);
    }

    private updateAlertComponent(alertComponent: ServerMessageListComponent, x: ValidationMessage[]) {
        alertComponent.clearAll();
        alertComponent.setMessages(x);

    }
}
