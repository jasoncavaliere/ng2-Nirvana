import { MessageType } from "./messageType";
export class ValidationMessage {
    constructor(public MessageType: MessageType, public Key: string, public Message: string) {
    }
}
