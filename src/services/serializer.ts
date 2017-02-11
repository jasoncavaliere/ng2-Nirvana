import { Injectable } from '@angular/core';

@Injectable()
export class Serializer {
    public serialize<T>(arg: T): string {
        return JSON.stringify(arg);
    }
    public deserialize<T>(obj: T, json: string): T {
        let jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        } else {
            for (let propName in jsonObj) {
                obj[propName] = jsonObj[propName];
            }
        }
        return obj;
    }

}
