import { Injectable } from "@angular/core";
import { Command } from "../models/command";
import { Query } from "../models/query";
import { QueryResponse } from "../models/queryResponse";
import { CommandResponse } from "../models/commandResponse";
import { ConfigService } from "./config-service";
import { AuthTokenResolver } from "./AuthTokenResolver";
import { Http, Headers } from "@angular/http";

@Injectable()
export class Mediator {

    public commandEndpoint: string;
    public queryEndpoint: string;

    constructor(private http: Http, private configService: ConfigService, private tokenResolver: AuthTokenResolver) {
        this.commandEndpoint = configService.config.commandEndpoint;
        this.queryEndpoint = configService.config.queryEndpoint;
    }

    public query<U>(query: Query<U>): Promise<QueryResponse<U>> {
        let url = this.getQueryUrl(query) + '?' + this.getAsUriParameters(query);
        return this.tokenResolver.getToken(this.queryEndpoint).then((token) => this.doQuery(query, url, token));
    }

    public command<U>(command: Command<U>): Promise<CommandResponse<U>> {
        let url = this.getCommandUrl(command);
        return this.tokenResolver.getToken(this.commandEndpoint).then((token) => this.doCommand(command, url, token));
    }

    private doQuery<U>(query: Query<U>, url: string, token: string): Promise<QueryResponse<U>> {
        return this.http
            .get(url, {
                headers : this.getHeaders(url, token),
                search : this.objectToParams(query)
            })
            .toPromise()
            .then((res) => res.json(), (res) => res.json());
    }

    private doCommand<U>(command: Command<U>, url: string, token: string): Promise<CommandResponse<U>> {
        return this.http
            .post(url, command, {headers : this.getHeaders(url, token)})
            .toPromise()
            .then((res) => res.json(), (res) => res.json());
    }

    private objectToParams(object: any): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();

        for (let key of Object.keys(object)) {
            if (!object.hasOwnProperty(key) || this.isEndPoint(key)) {
                continue;
            }
            params.set(key, JSON.stringify(object[key]));
        }
        return params;
    }

    private getAsUriParameters(data) {
        return Object.keys(data).map((k) => {
            if (Array.isArray(data[k])) {
                let keyE = encodeURIComponent(k + '[]');
                return data[k].map((subData) => keyE + '=' + encodeURIComponent(subData)).join('&');
            } else {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
            }
        }).join('&');
    }

    private getCommandUrl<U>(command: Command<U>) {
        let url = `${this.commandEndpoint}/${command.endpointName}`;
        return url;
    }

    private getQueryUrl<U>(query: Command<U>) {
        let url = `${this.queryEndpoint}/${query.endpointName}`;
        return url;
    }

    private getHeaders(url: string, token: string) {
        let headers = new Headers({'Content-Type' : 'application/json'});

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
