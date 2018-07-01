import { InjectionToken } from '@rxdi/core';

export interface IpfsHashString extends String {}
export interface LamportClock {
    id: string;
    time: number;
}
export interface OrbitDbIterator<T> {
    collect(): Array<{
        hash: IpfsHashString;
        id: string;
        payload: { op: string, key: any, value: T };
        next: Array<IpfsHashString>;
        v: number;
        clock: LamportClock;
        sig: string;
        key: string;
    }>;
}

export type OrbitDBEvents = 'replicated' | 'replicate' | 'replicate.progress' | 'load' | 'load.progress' | 'ready' | 'write';

export interface OrbitLogDatabaseInstanceEvents {
    on(event: OrbitDBEvents, callback: (address: string) => void): void;
    on(event: OrbitDBEvents, callback: (address: string, hash: IpfsHashString, entry: any, progress: any, have: any) => void): void;
    on(event: OrbitDBEvents, callback: (address: string, hash: IpfsHashString, entry: any, progress: any, total: any) => void): void;
    on(event: OrbitDBEvents, callback: (dbname: string) => void): void;
}

export interface OrbitLogDatabaseInstance<T> {
    load(): void;
    events: OrbitLogDatabaseInstanceEvents;
    iterator(options: {limit: number}): OrbitDbIterator<T>;
    add(data: T): IpfsHashString;
}

export interface OrbitDb {
    constructor(ipfs, directory?: string, options?: any);

    counter(...args: any[]): void;

    create(...args: any[]): void;

    disconnect(...args: any[]): void;

    docs(...args: any[]): void;

    docstore(...args: any[]): void;

    eventlog(...args: any[]): void;

    feed(...args: any[]): void;

    keyvalue(...args: any[]): void;

    kvstore(...args: any[]): void;

    log<T>(...args: any[]): OrbitLogDatabaseInstance<T>;

    open(...args: any[]): void;

    stop(...args: any[]): void;
}

export const OrbitDb = new InjectionToken<OrbitDb>('gapi-orbitdb-injection-token');

