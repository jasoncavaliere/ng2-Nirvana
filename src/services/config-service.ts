import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class ConfigService {
    public config: any = {};

    constructor(private http: Http) {
        console.log('ctor for ConfigService called.');
    }

    public load() {
        return new Promise((resolve) => {
            this.http.get('/nirvana.appConfig.json').map((res) => res.json())
                .subscribe((config) => {
                    console.log('Configuration loaded...........');
                    this.config = config;
                    resolve();
                });
        });
    }

}
