/**
 * ng2-nirvana - Nirvana extensions for Angular2
 * @version v0.0.4
 * @link https://github.com/jasoncavaliere/ng2-Nirvana
 * @license MIT
 */
export declare class Serializer {
    serialize<T>(arg: T): string;
    deserialize<T>(obj: T, json: string): T;
}
