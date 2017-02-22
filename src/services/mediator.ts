import { Injectable } from "@angular/core";
import { isJsObject } from "@angular/platform-browser-dynamic/src/facade/lang";
import { Command } from "../models/command";
import { Query } from "../models/query";
import { QueryResponse } from "../models/queryResponse";
import { CommandResponse } from "../models/commandResponse";
import { Headers, Http } from '@angular/http';
import { ConfigService } from "./config-service";
import { AuthTokenResolver } from "./AuthTokenResolver";

@Injectable()
export class Mediator {

    public commandEndpoint: string;
    public queryEndpoint: string;
    public getToken: (url: string) => string;
    // private serializer: Serializer;

    constructor(private http: Http, private configService: ConfigService, private tokenResolver: AuthTokenResolver) {
        this.commandEndpoint = configService.config.commandEndpoint;
        this.queryEndpoint = configService.config.queryEndpoint;
        console.log(configService.config);
        console.log(configService.config.commandEndpoint);
        console.log(configService.config.queryEndpoint);
    }

    public setTokenCallback(callback: (url: string) => string) {
        this.getToken = callback;
    }

    public query<U>(query: Query<U>): Promise<QueryResponse<U>> {
        let url = this.getQueryUrl(query) + '?' + this.objectToParams(query);
        return this.http
            .get(url, {headers : this.getHeaders(url)})
            .toPromise()
            .then((res) => res.json());
    }

    public command<U>(command: Command<U>): Promise<CommandResponse<U>> {
        let url = this.getCommandUrl(command);
        return this.http
            .post(this.getCommandUrl(command), JSON.stringify(command), {headers : this.getHeaders(url)})
            .toPromise()
            .then((res) => res.json());
    }

    private objectToParams(object): string {
        return Object.keys(object).map((key) => this.isEndPoint(key) ? '' : isJsObject(object[key]) ?
                this.subObjectToParams(encodeURIComponent(key), object[key])
                : `${encodeURIComponent(key)}=${this.cleanseValue(object, key)}`
        ).join('&');
    }

    private cleanseValue(object, key) {
        if (object[key] == null) {
            return '';
        }
        return encodeURIComponent(object[key]);
    }

    private getCommandUrl<U>(command: Command<U>) {
        let url = `${this.commandEndpoint}/${command.endpointName}`;
        return url;
    }

    private getQueryUrl<U>(query: Command<U>) {
        let url = `${this.queryEndpoint}/${query.endpointName}`;
        return url;
    }

    private getHeaders(url: string) {
        let headers = new Headers({'Content-Type' : 'application/json'});

        if (this.tokenResolver.isEnabled) {
            headers.append('Authorization', 'Bearer ' + this.tokenResolver.getToken(url));
        }
        return headers;
    }

    private subObjectToParams(key, object): string {

        return Object.keys(object)
            .map((childKey) => this.isEndPoint(key) ? '' : isJsObject(object[childKey]) ?
                        this.subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey])

                        : `${key}[${encodeURIComponent(childKey)}]=${this.cleanseValue(object, childKey)}`
                // :`${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`
            ).join('&');
    }

    // endpointName and typescriptPlace are used only for communication and TS copatability
    private isEndPoint(key: string) {
        return key === 'endpointName'
            || key === 'typescriptPlace';
    }
}
