/**
 * ng2-nirvana - Nirvana extensions for Angular2
 * @version v0.0.5
 * @link https://github.com/nirvana-framework/ng2-nirvana
 * @license MIT
 */
import { Subject } from "rxjs/Rx";
export declare enum MessageType {
    Info = 1,
    Warning = 2,
    Error = 3,
    Exception = 4,
}
export declare class ValidationMessage {
    MessageType: MessageType;
    Key: string;
    Message: string;
    constructor(MessageType: MessageType, Key: string, Message: string);
}
export declare class Serializer {
    serialize<T>(arg: T): string;
    deserialize<T>(obj: T, json: string): T;
}
export declare class ServerException {
    Message: string;
}
export declare class PagedResult<T> {
    Results: T[];
    LastPage: number;
    Total: number;
    PerPage: number;
    Page: number;
}
export declare abstract class Command<TResult> {
    endpointName: string;
    constructor(endpointName: string);
}
export declare abstract class Query<TResult> {
    endpointName: string;
    constructor(endpointName: string);
}
export declare class AppConstants {
    constructor();
    EmptyGuid: string;
}
export declare abstract class Response {
    ValidationMessages: ValidationMessage[];
    IsValid: boolean;
    Exception: ServerException;
    Success(): boolean;
}
export declare class CommandResponse<TResult> extends Response {
    Result: TResult;
    Throw(): void;
}
export declare class QueryResponse<TResult> extends Response {
    Result: TResult;
    Throw(): void;
}
export declare class SignalrWindow extends Window {
    $: any;
}
export declare enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4,
}
export declare class ChannelConfig {
    url: string;
    hubName: string;
    channel: string;
}
export declare class ChannelEvent {
    Name: string;
    ChannelName: string;
    Timestamp: Date;
    Data: any;
    Json: string;
    constructor();
}
export declare class ChannelSubject {
    channel: string;
    subject: Subject<ChannelEvent>;
}
