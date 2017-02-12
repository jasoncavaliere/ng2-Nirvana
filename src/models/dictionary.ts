export class Dictionary<T extends number | string, U> {
    private keysInternal: T[] = [];
    private valuesInternal: U[] = [];

    private undefinedKeyErrorMessage: string = "Key is either undefined, null or an empty string.";

    public add(key: T, value: U): void {

        let addAction = (k: T, v: U): void => {
            if (this.containsKey(k)) {
                throw new Error("An element with the same key already exists in the dictionary.");
            }

            this.keysInternal.push(k);
            this.valuesInternal.push(v);
        };

        this.checkKeyAndPerformAction(addAction, key, value);
    }

    public remove(key: T): boolean {
        let removeAction = (k: T): boolean => {
            if (!this.containsKey(k)) {
                return false;
            }
            let index = this.keysInternal.indexOf(k);
            this.keysInternal.splice(index, 1);
            this.valuesInternal.splice(index, 1);
            return true;
        };
        return <boolean> (this.checkKeyAndPerformAction(removeAction, key));
    }

    public getValue(key: T): U {

        let getValueAction = (k: T): U => {
            if (!this.containsKey(k)) {
                return null;
            }

            let index = this.keysInternal.indexOf(k);
            return this.valuesInternal[index];
        };

        return <U> this.checkKeyAndPerformAction(getValueAction, key);
    }

    public containsKey(key: T): boolean {

        let containsKeyAction = (k: T): boolean => {
            if (this.keysInternal.indexOf(k) === -1) {
                return false;
            }
            return true;
        };

        return <boolean> this.checkKeyAndPerformAction(containsKeyAction, key);
    }

    public changeValueForKey(key: T, newValue: U): void {

        let changeValueForKeyAction = (k: T, nv: U): void => {
            if (!this.containsKey(k)) {
                throw new Error("In the dictionary there is no element with the given key.");
            }

            let index = this.keysInternal.indexOf(k);
            this.valuesInternal[index] = nv;
        };

        this.checkKeyAndPerformAction(changeValueForKeyAction, key, newValue);
    }

    public keys(): T[] {
        return this.keysInternal;
    }

    public values(): U[] {
        return this.valuesInternal;
    }

    public count(): number {
        return this.valuesInternal.length;
    }

    private isEitherUndefinedNullOrStringEmpty(object: any): boolean {
        return (typeof object) === "undefined" || object === null || object.toString() === "";
    }

    private checkKeyAndPerformAction(action: {(key: T, value?: U): void | U | boolean}, key: T, value?: U): void | U | boolean {

        if (this.isEitherUndefinedNullOrStringEmpty(key)) {
            throw new Error(this.undefinedKeyErrorMessage);
        }

        return action(key, value);
    }

}
