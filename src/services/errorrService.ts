import { Injectable, EventEmitter } from '@angular/core';
import { Dictionary } from "../models/dictionary";
import { ValidationMessage } from "../models/validationMessage";
import { Response } from "../models/response";

@Injectable()
export class ErrorService {
    private errors: Dictionary<string, EventEmitter<ValidationMessage[]>>;

    constructor() {
        this.errors = new Dictionary<string, EventEmitter<ValidationMessage[]>>();
    }

    public registerComponent(componentName: string): EventEmitter<ValidationMessage[]> {
        if (!this.errors.containsKey(componentName)) {
            this.errors.add(componentName, new EventEmitter<ValidationMessage[]>());
        } else {
            console.log('dispose did not handle correctly, WTF mate?');
        }
        return this.errors.getValue(componentName);
    }

    public unregisterComponent(errorComponentName: string) {
        if (!this.errors.containsKey(errorComponentName)) {
            console.log('init failed, WTF mate?');
            return;
        }
        this.errors.remove(errorComponentName);
    }

    public showErrors(componentName: string, messages: ValidationMessage[]) {
        if (!this.errors.containsKey(componentName)) {
            for (let message of messages) {
                console.log(`${message.Key}: ${message.Message}`);
            }
        } else {
            this.errors.getValue(componentName).emit(messages);
        }
    }

    public recieveMessages(messages: ValidationMessage[], compoenentName: string) {
        for (let message of messages) {
            if (message != null) {
                console.log(`${compoenentName} - ${message.Message}`);
            }
        }
    }
}
