import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class ConfigService {
    public config: any = null;

    constructor(private http: Http) {
        console.log('ctor for ConfigService called.');
    }

    public load() {
        console.log('Inside Load');
        return new Promise((resolve) => {
            this.http.get('/appConfig.json').map((res) => res.json())
                .subscribe((config) => {
                    console.log('Configuration loaded...........');
                    this.config = config;
                    resolve();
                });
        });
    }

}
