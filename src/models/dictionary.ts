export class Dictionary<T extends number | string, U> {
    private keysInternal: T[] = [];
    private valuesInternal: U[] = [];

    private undefinedKeyErrorMessage: string = "Key is either undefined, null or an empty string.";

    public add(key: T, value: U): void {

        const addAction = (k: T, v: U): void => {
            if (this.containsKey(k)) {
                throw new Error("An element with the same key already exists in the dictionary.");
            }

            this.keysInternal.push(k);
            this.valuesInternal.push(v);
        };

        this.checkKeyAndPerformAction(addAction, key, value);
    }

    public remove(key: T): boolean {
        const removeAction = (k: T): boolean => {
            if (!this.containsKey(k)) {
                return false;
            }
            const index = this.keysInternal.indexOf(k);
            this.keysInternal.splice(index, 1);
            this.valuesInternal.splice(index, 1);
            return true;
        };
        return (this.checkKeyAndPerformAction(removeAction, key)) as boolean;
    }

    public getValue(key: T): U {

        const getValueAction = (k: T): U => {
            if (!this.containsKey(k)) {
                return null;
            }

            const index = this.keysInternal.indexOf(k);
            return this.valuesInternal[index];
        };

        return this.checkKeyAndPerformAction(getValueAction, key) as U;
    }

    public containsKey(key: T): boolean {

        const containsKeyAction = (k: T): boolean => {
            if (this.keysInternal.indexOf(k) === -1) {
                return false;
            }
            return true;
        };

        return  this.checkKeyAndPerformAction(containsKeyAction, key) as boolean;
    }

    public changeValueForKey(key: T, newValue: U): void {

        const changeValueForKeyAction = (k: T, nv: U): void => {
            if (!this.containsKey(k)) {
                throw new Error("In the dictionary there is no element with the given key.");
            }

            const index = this.keysInternal.indexOf(k);
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

    private checkKeyAndPerformAction(action: (key: T, value?: U) => void | U | boolean, key: T, value?: U): void | U | boolean {

        if (this.isEitherUndefinedNullOrStringEmpty(key)) {
            throw new Error(this.undefinedKeyErrorMessage);
        }

        return action(key, value);
    }

}
