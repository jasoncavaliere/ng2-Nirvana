/**
 * ng2-nirvana - Nirvana extensions for Angular2
 * @version v0.0.5
 * @link https://github.com/nirvana-framework/ng2-nirvana
 * @license MIT
 */
import {Subject} from "rxjs/Rx";
export enum MessageType{Info=1,Warning=2,Error=3,Exception=4}
export class ValidationMessage{constructor(public MessageType: MessageType,public Key: string,public Message: string){}}
export class Serializer{
    public serialize<T>(arg: T): string {
     return JSON.stringify(arg);
    }
    public deserialize<T>(obj: T, json: string) : T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }

}


export class ServerException{    public Message:string;}
export class PagedResult<T>{public Results:T[] ; public LastPage:number; public Total:number;public PerPage:number;public Page:number}
export abstract class Command<TResult> {    constructor(public endpointName:string){}}
export abstract class Query<TResult> {constructor(public endpointName:string){}}
export class AppConstants{
    constructor(){
        this.EmptyGuid = "00000000-0000-0000-0000-000000000000";
    }

    public EmptyGuid : string;
}

export abstract class Response {
    public ValidationMessages: ValidationMessage[];
    public IsValid:boolean;
    public Exception:ServerException;

    public Success() {
        return this.IsValid && this.Exception == null;
    }
}

export class CommandResponse<TResult> extends Response {
    public Result: TResult;
    public Throw(){
        if(this.Exception){
            throw this.Exception.Message
        }
    }
}
export class QueryResponse<TResult> extends Response {
    public Result: TResult;
    public Throw(){
        if(this.Exception){
            throw this.Exception.Message
        }
    }
}


export class SignalrWindow extends Window {
    $: any;
}

export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4
}

export class ChannelConfig {
    url: string;
    hubName: string;
    channel: string;
}

export class ChannelEvent {
    Name: string;
    ChannelName: string;
    Timestamp: Date;
    Data: any;
    Json: string;

    constructor() {
        this.Timestamp = new Date();
    }
}
export class ChannelSubject {
    channel: string;
    subject: Subject<ChannelEvent>;
}

