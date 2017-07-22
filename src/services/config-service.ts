import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class ConfigService {
    public config: any = {};

    constructor(private http: Http) {}

    public load() {
        return new Promise((resolve) => {
            this.http.get('/nirvana.appConfig.json').map((res) => res.json())
                .subscribe((config) => {
                    this.config = config;
                    resolve();
                });
        });
    }

}
