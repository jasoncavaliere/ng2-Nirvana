import { Injectable } from "@angular/core";
import { Command } from "../models/command";
import { Query } from "../models/query";
import { QueryResponse } from "../models/queryResponse";
import { CommandResponse } from "../models/commandResponse";
import { ConfigService } from "./config-service";
import { AuthTokenResolver } from "./AuthTokenResolver";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class Mediator {

    public commandEndpoint: string;
    public queryEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService, private tokenResolver: AuthTokenResolver) {
        this.commandEndpoint = configService.config.commandEndpoint;
        this.queryEndpoint = configService.config.queryEndpoint;
    }

    public query<U>(query: Query<U>): Promise<QueryResponse<U>> {
        const url = this.getQueryUrl(query) + '?' + this.getAsUriParameters(query, '');
        return this.tokenResolver.getToken(this.queryEndpoint).then((token) => this.doQuery(query, url, token));
    }

    public command<U>(command: Command<U>): Promise<CommandResponse<U>> {
        const url = this.getCommandUrl(command);
        return this.tokenResolver.getToken(this.commandEndpoint).then((token) => this.doCommand(command, url, token));
    }

    private doQuery<U>(query: Query<U>, url: string, token: string): Promise<QueryResponse<U>> {
        return this.http
            .get<QueryResponse<U>>(url, {
                headers : this.getHeaders(token)
            })
            .toPromise();
    }

    private doCommand<U>(command: Command<U>, url: string, token: string): Promise<CommandResponse<U>> {
        return this.http
            .post<CommandResponse<U>>(url, command, {headers : this.getHeaders(token)})
            .toPromise();
    }

    private objectToParams(object: any): URLSearchParams {
        const params: URLSearchParams = new URLSearchParams();

        for (const key of Object.keys(object)) {
            if (!object.hasOwnProperty(key) || this.isEndPoint(key)) {
                continue;
            }
            params.set(key, JSON.stringify(object[key]));
        }
        return params;
    }

    private getAsUriParameters(data, keyPreprend: string) {
        return Object.keys(data).map((k) => {
            if (data[k] == null) {
                return '';
            }

            if (Array.isArray(data[k])) {
                const keyE = keyPreprend + encodeURIComponent(k + '[]');
                return data[k].map((subData) => keyE + '=' + encodeURIComponent(subData)).join('&');
            }
            if (typeof data[k] === 'object') {
                    console.log(data[k]);
                    if (Object.keys(data[k]) == null) {
                        return null;
                    }
                    return this.getAsUriParameters(data[k], k + '.');
            }

            return keyPreprend + encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }).join('&');
    }

    private getCommandUrl<U>(command: Command<U>) {
        return `${this.commandEndpoint}/${command.endpointName}`;
    }

    private getQueryUrl<U>(query: Query<U>) {
        return `${this.queryEndpoint}/${query.endpointName}`;
    }

    private getHeaders(token: string): HttpHeaders {
        const headers = new HttpHeaders({'Content-Type' : 'application/json'});

        if (this.tokenResolver.isEnabled) {
            headers.append('Authorization', 'Bearer ' + token);
        }
        return headers;
    }

    // endpointName and typescriptPlace are used only for communication and TS copatability
    private isEndPoint(key: string) {
        return key === 'endpointName'
            || key === 'typescriptPlace';
    }
}
